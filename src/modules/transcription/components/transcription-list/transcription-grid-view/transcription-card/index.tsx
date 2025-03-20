import { ITranscription } from '@/modules/transcription/models';
import './index.css';
import { Button } from '@/shadcn/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { selectedTranscription } from '@/modules/transcription/slice/transcriptionSlice';
import { useDispatch} from 'react-redux';
import { useTranslations } from 'use-intl';
import transcription_icon from '../../../../../../assets/icons/transcription_icon.svg';

interface ITranscriptionCard {
  Transcription: any;
  setTranscriptionTitleDescriptionDialogOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setTitleDescriptionSelectedTranscription: React.Dispatch<
    React.SetStateAction<ITranscription>
  >;
  setUpdateTranscriptiontDialogOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const TranscriptionCard = ({
  Transcription,
  setTranscriptionTitleDescriptionDialogOpen,
  setTitleDescriptionSelectedTranscription,
  setUpdateTranscriptiontDialogOpen,
}: ITranscriptionCard) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const t = useTranslations();

  return (
    <>
      <div className='transcription_card sm:basis-[30%] basis-[92%]'
        onClick={(e) => {
             e.stopPropagation();
             navigate(`/transcription/detail/${Transcription?.id}`);
        }}
      >
        <div className='trans-container-card bg-green-box'>
          <div className='flex  items-center'>
            <div className='w-[40%]'>
              <div>
                <img
                  src={transcription_icon}
                  alt='trans_icon'
                />
              </div>
            </div>
            <p
              className='font-bold text-lg cursor-pointer'
              onClick={(e) => {
                e.stopPropagation();
                setTitleDescriptionSelectedTranscription(Transcription);
                setTranscriptionTitleDescriptionDialogOpen((prev) => !prev);
              }}
            >
              {Transcription?.title.length > 15
                ? `${Transcription?.title.slice(0, 15)}...`
                : Transcription?.title}
            </p>
          </div>
          <div className='mt-3 flex flex-col gap-2'>
            <div
              className='flex  font-semibold cursor-pointer '
              onClick={() => {
                setTitleDescriptionSelectedTranscription(Transcription);
                setTranscriptionTitleDescriptionDialogOpen((prev) => !prev);
              }}
            >
              <p className='basis-[40%]'>{t('transcription.created_by')} :</p>
              <p className='basis-[60%]'>
                {Transcription?.created_by?.name?.length > 15
                  ? `${Transcription?.created_by?.name?.slice(0, 15)}...`
                  : Transcription?.created_by?.name}
              </p>
            </div>
            <div
              className='flex  font-semibold cursor-pointer'
              onClick={(e) => {
                e.stopPropagation();
                setTitleDescriptionSelectedTranscription(Transcription);
                setTranscriptionTitleDescriptionDialogOpen((prev) => !prev);
              }}
            >
              <p className='basis-[40%]'>
                {t('transcription.transcription_duration')} :
              </p>
              <p>
                {Transcription?.text?.content.length > 1
                  ? Transcription?.text?.content[
                      Transcription?.text?.content.length - 1
                    ].startTime
                  : Transcription?.text?.content[0]?.startTime}
              </p>
            </div>
          </div>
          <div className='flex justify-end pr-3 mt-3 gap-3 font-bold'>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(selectedTranscription(Transcription));
                setUpdateTranscriptiontDialogOpen((prev) => !prev);
              }}
            >
              {t('transcription.update')}
            </Button>
            <Button
              disabled={!Transcription?.summary}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(selectedTranscription(Transcription));
                navigate(`/summary/detail/${Transcription?.summary}`);
              }}
            >
              {t('transcription.summary')}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TranscriptionCard;
