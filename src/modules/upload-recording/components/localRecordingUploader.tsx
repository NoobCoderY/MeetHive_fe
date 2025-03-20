/* eslint-disable */
import { Button } from '@/shadcn/components/ui/button';
import { Input } from '@shadcn//components/ui/input';
import { Label } from '@/shadcn/components/ui/label';
import { ReloadIcon } from '@radix-ui/react-icons';
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'use-intl';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { parsedMediaFile } from '../utils';
import { Progress } from '@/shadcn/components/ui/progress';
import { useToast } from '@/shadcn/components/ui/use-toast';
import {
  useGetSignedUrlMutation,
  useCreateUploadRecordingTranscriptionMutation,
} from '../services';
import axios from 'axios';
import SaveSTranscriptionInfoDialog from './save-transcripton-info-dialog';
import { useLocation, useNavigate } from 'react-router-dom';
import { createFFmpeg, fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';
import './index.css';

export const ffmpegWasm: FFmpeg = createFFmpeg({
  corePath: 'https://justagile-ui.vercel.app/file/ffmpeg/ffmpeg-core.js',
  log: true,
});



interface IRecordingUploadProps {
  // setSelectDialogComponent: React.Dispatch<React.SetStateAction<number>>;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

const LocalRecordingUploader = ({
  // setSelectDialogComponent,
  setIsDialogOpen,
}: IRecordingUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>(' ');
  const [getSignedUrl, { isLoading: signedUrlLoading }] =
    useGetSignedUrlMutation();
  const [createUploadRecordingTranscription, { isLoading }] =
    useCreateUploadRecordingTranscriptionMutation();
  const [uploadFileLoading, setUploadFileLoading] = useState(false);
  const [signedUrl, setSignedUrl] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState(0);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [fileConvertingLoading, setFileConvertingLoading] = useState(false);
  const [isFFmpegLoading,setIsFFmpegLoading]=useState(false)

  const usage = useSelector((state: RootState) => state.restriction);
  const location = useLocation();
  const navigate = useNavigate();

  const t = useTranslations();
  const { toast } = useToast();
 

  const loadFfmpeg = async () => {
    setIsFFmpegLoading(true)
    try {
      await ffmpegWasm.load().then(() => {
        console.log('FFmpeg loaded');
        setIsFFmpegLoading(false)
      });
    } catch (error) {
      setIsFFmpegLoading(false)
      console.log(error, 'error from ffmpge load');
    }
  
  };

  useEffect(() => {
    loadFfmpeg();
  }, []);

  const uploadToS3 = async (signedUrl: string, fileToUpload: File) => {
    try {
      setUploadFileLoading(true);
      await axios.put(signedUrl, fileToUpload, {
        headers: {
          'Content-Type': fileToUpload.type,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });
      setUploadFileLoading(false);
    } catch (error) {
      setUploadFileLoading(false);
      throw new Error(error);
    }
  };

  /**
   * Opens the save information dialog for 5 seconds.
   * Resets the transcription name and selected file after closing.
   * If on the transcription page, refreshes the page.
   *
   * @returns {void}
   */
  const openSaveInfoDilog = () => {
    setIsSaveDialogOpen(true);
    setTimeout(() => {
      setIsSaveDialogOpen(false);
      setIsDialogOpen(false);
      setName('');
      setSelectedFile(null);

      if (location.pathname === '/transcription') {
        navigate(0);
      }
    }, 5000);
  };

  const createTranscriptionObject = async (duration) => {
    try {
      const transcriptionData = await createUploadRecordingTranscription({
        title: name,
        description: description,
        audio_url: signedUrl,
        duration: Math.round(duration),
      }).unwrap();

      toast({
        title: 'Success',
        description: t('transcription.save_success'),
      });

      openSaveInfoDilog();
    } catch (error) {
      toast({
        title: 'Error',
        description: error?.data?.error || t('transcription.save_failed'),
        variant: 'destructive',
      });
    }
  };

  const handleUploadFile = async (fileToUpload: File) => {
    if (fileToUpload) {
      try {
        const checkRestrictionTime = await parsedMediaFile(fileToUpload);
       

        if (checkRestrictionTime.duration > usage?.remainingUsedSecond) {
          return toast({
            title: 'Error',
            description: t('transcription.time_alert.title'),
            variant: 'destructive',
          });
        }
        setDuration(checkRestrictionTime.duration);

        const result = await getSignedUrl({
          fileName: fileToUpload.name,
          fileType: fileToUpload.type,
        }).unwrap();

        const signed_url = result?.data?.signed_url;

        await uploadToS3(signed_url, fileToUpload);

        toast({
          title: 'Success',
          description: t('upload_recording.file_upload_success'),
        });

        if (signed_url) {
          const url = new URL(signed_url);
          const myFilePath = `${url.origin}${url.pathname}`;
          setSignedUrl(myFilePath);
        }
      } catch (error) {
        toast({
          title: 'Error',
          description:
            error?.data?.error ||
            error?.message ||
            t(`upload_recording.restriction.${error?.errMessage}`),
          variant: 'destructive',
        });
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (selectedFile) {
        setProgress(0);
        await handleUploadFile(selectedFile);
      }
    })();
  }, [selectedFile]);

  const convertToMp3 = async (mpegFile: File) => {
    setFileConvertingLoading(true);
   
    
    const uniqueInputFileName = `input_${Date.now()}.mpeg`;
    ffmpegWasm.FS('writeFile', uniqueInputFileName, await fetchFile(mpegFile));
    await ffmpegWasm.run('-i', uniqueInputFileName, 'output.mp3');
    const mp3Data = ffmpegWasm.FS('readFile', 'output.mp3');
    const mp3Blob = new Blob([mp3Data.buffer], { type: 'audio/mp3' });
    const originalFileName = mpegFile.name.split('.').slice(0, -1).join('.');
    const mp3File = new File([mp3Blob], `${originalFileName}.mp3`, {
      type: 'audio/mp3',
    });
    setFileConvertingLoading(false);

    
    return mp3File;
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!isFFmpegLoading) {
      const file = event.target.files?.[0] || null;
      if (file && file.type === 'audio/mpeg') {
        const mp3File = await convertToMp3(file);
        setSelectedFile(mp3File);
      } else {
        setSelectedFile(file);
      }
    }
  };

  return (
    <div className=' max-h-[580px] flex justify-between items-center flex-col'>
      <p className='relative text-center text-xl inline-block'>
        {t('upload_recording.upload_recording_button')}
        <span className='absolute bottom-[-0.25rem] left-0 w-full h-[1px] bg-[#fff]'></span>
      </p>

      <div className='flex justify-center items-start flex-col mt-5 gap-2 w-[80%]'>
        <div className='w-full mb-3 flex flex-col gap-3'>
          <Label
            htmlFor='name'
            className='text-md font-bold'
          >
            {t('upload_recording.name')}
          </Label>
          <Input
            id='name'
            type='text'
            onChange={(event) => setName(event.target.value || '')}
          />
        </div>

        <div className=' w-full flex flex-col gap-3'>
          <Label
            htmlFor='recording'
            className='text-md font-bold'
          >
            {t('upload_recording.select_recording')}
          </Label>

          <Input
            id='recording'
            type='file'
            accept='video/mp4,audio/mp3'
            onChange={(event) => handleFileChange(event)}
          />
          {selectedFile && <Progress value={progress} />}
          {fileConvertingLoading ? (
            <small className='text-md font-semibold'>
              <span className='sm:text-[11px] text-[12px]'>
                {t('upload_recording.file_converter_notificationMessage')}
              </span>
              <span className='dot-animation text-[14px]'></span>
            </small>
          ) : (
            <small className='text-md font-semibold'>
              {t('upload_recording.recording_acc')}
            </small>
          )}
        </div>
      </div>

      <div className='flex justify-end gap-4 mt-4 w-full'>
        <Button
          className='sm:w-[20vw] md:w-[23vw]  lg:w-[15vw] w-[35vw] text-[10px] sm:text-[12px] md:text-[16px] lg:text-[14px] text-md font-semibold !p-[0.5rem] !pb-[0.6rem]'
          disabled={isLoading || signedUrlLoading || uploadFileLoading}
          onClick={() => {
            createTranscriptionObject(duration);
          }}
        >
          {isLoading && (
            <ReloadIcon
              color='#000'
              className='mr-2 h-4 w-4 animate-spin '
              style={{ color: 'blue' }}
            />
          )}
          {t('upload_recording.generate_transcription')}
        </Button>
      </div>

      <SaveSTranscriptionInfoDialog
        isSaveDialogOpen={isSaveDialogOpen}
        setIsSaveDialogOpen={setIsSaveDialogOpen}
      />
    </div>
  );
};

export default LocalRecordingUploader;
