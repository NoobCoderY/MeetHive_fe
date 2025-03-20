import React, { useEffect, useRef, useState } from 'react';
import JAButton from '@/shadcn/atoms/ja-button';
import { MicIcon } from 'lucide-react';
import { useTranslations } from 'use-intl';
import RecordingPermissionDialog from '../recording-permission-popup';
import { Pause } from 'lucide-react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  startRecording,
  stopRecording,
} from '@/modules/transcription/utils/transcribeClient';
import { setCurrentTranscription } from '@/modules/transcription/slice/transcriptionSlice';
import SaveTranscriptionDialog from '@/modules/transcription/components/save-transcription-dailog';
import { useToast } from '@/shadcn/components/ui/use-toast';
import { convertSeconds } from '@/modules/transcription/utils';
import { hasExceededLimit } from '../../utils';
import TimeLimitAlert from '../time-limit-alert';
import { isLimitThresholdReached } from '../../utils';
import useResponsive from '@/hooks/useResponsive';

const AudioRecorderSheet = () => {
  const [audioRecorderSheetOpen, setAudioRecorderSheetOpen] =
    React.useState<boolean>(false);
  const [isRecordingPermission, setIsRecordingPermission] =
    React.useState<boolean>(false);
  const [showRecordingSheetPopup, setShowRecordingSheetPopup] =
    React.useState<boolean>(false);
  const [showSaveTranscriptionPopup, setShowSaveTranscriptionPopup] =
    React.useState<boolean>(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const showOnceExceedAlert = useRef(true);
  const [duration, setDuration] = useState<number>();
  const currentTranscription = useSelector(
    (state: RootState) => state.transcription.currentTranscription
  );
  const disableRecordingBtn = useSelector(
    (state: RootState) => state.layout.recordingDisableBtn
  );
  const transcriptionRestrictionTime = useSelector(
    (state: RootState) => state.restriction
  );
  const breakPoints = useResponsive([600, 900, 1400]);

  const currentTranscriptionRef = useRef(currentTranscription);
  const dispatch = useDispatch();
  const { toast } = useToast();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleRecordPress = () => {
    if (!isRecording) {
      startRecordingBtn();
    } else {
      stopRecordingBtn();
    }
  };

  const startRecordingBtn = async () => {
    setIsButtonDisabled(true);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 10000);
    try {
      await startRecording(onTranscriptionDataReceived);
    } catch (error) {
      setIsRecording(false);
      await stopRecording();
      toast({
        title: 'Error',
        description: 'An error occurred while recording: ' + error,
        variant: 'destructive',
      });
      setAudioRecorderSheetOpen(false);
    }
  };

  useEffect(() => {
    currentTranscriptionRef.current = currentTranscription;
  }, [currentTranscription]);

  const onTranscriptionDataReceived = (transcript: {
    speaker: string;
    speech: string;
    startTime: number;
    endTime: number;
  }) => {
    const contentCopy = [...currentTranscriptionRef.current.content];
    if (contentCopy.length === 0) {
      contentCopy.push({
        speaker: transcript.speaker,
        speech: transcript.speech,
        startTime: convertSeconds(Math.round(transcript.startTime)),
      });
    } else {
      const lastEntry = { ...contentCopy[contentCopy.length - 1] };
      if (lastEntry.speaker === transcript.speaker) {
        lastEntry.speech += ` ${transcript.speech}`;
        contentCopy[contentCopy.length - 1] = lastEntry;
      } else {
        contentCopy.push({
          speaker: transcript.speaker,
          speech: transcript.speech,
          startTime: convertSeconds(Math.round(transcript.startTime)),
        });
      }
    }

    dispatch(
      setCurrentTranscription({
        content: contentCopy,
        endTime: Math.round(transcript.endTime),
      })
    );
    if (showOnceExceedAlert.current) {
      if (
        isLimitThresholdReached(
          transcriptionRestrictionTime.remainingUsedSecond,
          transcript.endTime
        )
      ) {
        setDuration(5);
        setAlertOpen(true);
        disableAlert().then(() => {
          setAlertOpen(false);
          showOnceExceedAlert.current = !showOnceExceedAlert.current;
        });
      }
    }
    if (
      hasExceededLimit(
        transcriptionRestrictionTime.transcriptionRestrictionTime,
        transcript.endTime
      )
    ) {
      setDuration(320);
      setAlertOpen(true);
      disableAlert().then(() => {
        setAlertOpen(false);
        setShowSaveTranscriptionPopup(true);
        stopRecordingBtn();
        setAudioRecorderSheetOpen(false);
      });

      return;
    }
  };

  const stopRecordingBtn = async () => {
    setIsButtonDisabled(true);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 10000);
    setIsRecording(false);
    stopRecording();
  };

  const t = useTranslations();
  const navigate = useNavigate();

  const handlePopup = () => {
    setShowRecordingSheetPopup(!showRecordingSheetPopup);
  };

  const disableAlert = async () => {
    return new Promise((res) => {
      setTimeout(() => {
        res(true);
      }, 5000);
    });
  };

  const toggleRecording = () => {
    if (
      hasExceededLimit(
        transcriptionRestrictionTime.transcriptionRestrictionTime,
        0
      )
    ) {
      setDuration(320);
      setAlertOpen(true);
      disableAlert().then(() => setAlertOpen(false));
      return;
    }
    if (isRecordingPermission) {
      // ... (if user already given recording permission then no need to show popup)
      if (!audioRecorderSheetOpen) {
        startRecordingBtn();
      } else {
        setShowSaveTranscriptionPopup((prev) => !prev);
        stopRecordingBtn();
      }

      setAudioRecorderSheetOpen((prev) => !prev);
      // this is for suppose we call start or stop recording from another page so first navigate to this page and then show recording
      navigate('/transcription/live');

      return;
    } else {
      handlePopup();
    }
  };

  return (
    <>
      {breakPoints == 0 ? (
        <>
          <span
            className={`cursor-pointer flex items-center gap-2 ${
              audioRecorderSheetOpen ? '' : ''
            } ${
              isButtonDisabled || disableRecordingBtn
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            onClick={() => {
              if (!(isButtonDisabled || disableRecordingBtn)) {
                toggleRecording();
              }
            }}
          >
            {!audioRecorderSheetOpen ? (
              <>
                <MicIcon size={16} />
              </>
            ) : (
              <>
                <Pause
                  color='#89d289'
                  size={16}
                />
              </>
            )}
          </span>
        </>
      ) : (
        <>
          <JAButton
            variant='outline'
            className={`!w-[18vw] ${
              audioRecorderSheetOpen ? 'recording_btn' : ''
            } `}
            onClick={() => {
              toggleRecording();
            }}
            disabled={isButtonDisabled || disableRecordingBtn}
          >
            {!audioRecorderSheetOpen ? (
              <div className='flex gap-2'>
                <MicIcon size={20} />
                {t('header.start_recording')}
              </div>
            ) : (
              <div className='flex gap-2'>
                <Pause size={20} /> &nbsp;
                {t('header.stop_recording')}
              </div>
            )}
          </JAButton>
        </>
      )}

      <RecordingPermissionDialog
        showPopup={showRecordingSheetPopup}
        handlePopup={handlePopup}
        setIsRecordingPermission={setIsRecordingPermission}
        setAudioRecorderSheetOpen={setAudioRecorderSheetOpen}
        startRecordingBtn={startRecordingBtn}
      />

      <SaveTranscriptionDialog
        isDialogOpen={showSaveTranscriptionPopup}
        setIsDialogOpen={setShowSaveTranscriptionPopup}
      />
      <TimeLimitAlert
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        duration={duration}
      />
    </>
  );
};

export default AudioRecorderSheet;
