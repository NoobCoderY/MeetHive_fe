import { Button } from '@/shadcn/components/ui/button';
import { Card } from '@/shadcn/components/ui/card';
import { ReloadIcon } from '@radix-ui/react-icons';
import { ChevronsDown, ChevronsUp, Speech } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useDeleteTranscriptionMutation,
  useTranscriptionByIdQuery,
} from '@/modules/transcription/sevices/transcription';
import { useTranslations } from 'use-intl';
import { useToast } from '@/shadcn/components/ui/use-toast';
import { useEffect } from 'react';
import { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { selectedTranscription } from '@/modules/transcription/slice/transcriptionSlice';
import ConfrimDeleteDailog from '../../confirm-delete-transcription';
import { useCreateSummaryMutation } from '@/modules/summary/services/summary';
import JAButton from '@/shadcn/atoms/ja-button';
import { useParams } from 'react-router-dom';
import { LoadingSpinner } from '@/shadcn/components/shared/loader';
import GenerateSummaryDialog from '../../generate-summary-dailog';

const MTranscriptionDetail = () => {
  const [toggleAccordian, setToggleAccordian] = useState(false);
  const [confirmDeleteDailog, setConfirmDeleteDailog] =
    useState<boolean>(false);
  const { transcriptionId } = useParams();
  const [checkGenerateSummaryDialogOpen, setCheckGenerateSummaryDialogOpen] =
    useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [deleteTranscription, { isLoading, isError, isSuccess }] =
    useDeleteTranscriptionMutation();
  const {
    data: transcriptionData,
    error: transcriptionError,
    isSuccess: isTranscriptionSuccess,
    refetch: refetchTranscriptionById,
    isLoading: transcriptionLoading,
  } = useTranscriptionByIdQuery({ transcriptionId: transcriptionId || '' });

  useEffect(() => {
    if (isTranscriptionSuccess) {
      dispatch(selectedTranscription(transcriptionData?.data));
    }

    if (transcriptionError) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: transcriptionError?.data?.error,
      });
    }
  }, [isTranscriptionSuccess, transcriptionError]);

  useEffect(() => {
    refetchTranscriptionById();
  }, [transcriptionId]);

  const transcription = useSelector(
    (state: RootState) => state.transcription.selectedTranscription
  );

  const t = useTranslations();
  const { toast } = useToast();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [
    createSummary,
    {
      isSuccess: summarySuccess,
      error: summaryError,
      isLoading: summaryLoading,
    },
  ] = useCreateSummaryMutation();
  const deleteTranscriptionHandle = () => {
    deleteTranscription({
      transcriptionId: transcription.id,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Success',
        description: t('transcription.delete_success'),
      });
      dispatch(selectedTranscription(null));
      navigate('/transcription');
    }

    if (isError) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: t('transcription.delete_failed'),
      });
    }
  }, [isError, isSuccess]);

  const openGenerateSummaryDialog = () => {
    setTimeout(() => {
      setCheckGenerateSummaryDialogOpen(true);
      setIsDialogOpen(false);
    }, 10000);
  };

  const createSummaryHandle = () => {
    setIsDialogOpen(true);
    openGenerateSummaryDialog();
    createSummary({
      transcription: transcription?.id,
    });
  };

  useEffect(() => {
    if (summarySuccess && checkGenerateSummaryDialogOpen) {
      toast({
        title: 'Success',
        description: t('transcription.summary_success'),
      });
      navigate('/summary/list');
    }

    if (summaryError) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: summaryError?.data?.error,
      });
    }
  }, [summaryError, summarySuccess, checkGenerateSummaryDialogOpen]);

  if (transcriptionLoading) {
    return (
      <div className='flex justify-center items-center h-[60vh]'>
        <LoadingSpinner
        />
      </div>
    );
  }

  return (
    <div className='px-3'>
      {toggleAccordian ? (
        <Card
          className='flex justify-between p-2'
          onClick={() => setToggleAccordian(!toggleAccordian)}
        >
          <h1 className='text-md'> Transcription</h1>
          <span>
            <ChevronsDown
              color='#89d289'
              size={28}
            />
          </span>
        </Card>
      ) : (
        <>
          <div className='relative'>
            <div className='absolute left-2 text-xl'>
              {t('transcription.title')}
            </div>
            <div className='  absolute right-[4px] top-[5px] z-10 w-[21.3%] flex justify-center items-center'>
              <div className='card_close_button_outer w-[100%] h-[100%] '>
                <div
                  className='card_close_button_inner w-[100%] h-[100%]  flex justify-center items-center py-[0.1rem] pl-[3px] '
                  onClick={() => setToggleAccordian(!toggleAccordian)}
                >
                  <ChevronsUp
                    size={27}
                    color='#97ec97'
                  />
                </div>
              </div>
            </div>
            <div className='todos_summary_outer_card w-[100%] h-[100%]'>
              <div className='todos_summary_inner_card w-[100%] h-[100%]'>
                <div className='  px-3 pt-12 pb-6 h-[24rem]'>
                  <div className='overflow-auto sm:max-h-[16rem] h-[16rem]'>
                    {transcription?.status === 'pending'? (
                      <div className='flex justify-center items-center h-[100%] ml-4'>
                        <p className='text-lg font-semibold'>
                          {t('transcription.pending_transcription_msg')}
                        </p>
                      </div>
                    ) : (
                      transcription?.text?.content?.map((item, index) => {
                        return (
                          <div
                            className='flex gap-3 mt-5'
                            key={`${index} ${item.startTime}`}
                          >
                            <div className='flex justify-start h-[100%]'>
                              <div className=' flex-none min-w-[6vw] min-h-[4vh] rounded-[50%] bg-slate-400 flex justify-center items-center'>
                                <Speech size={15} />
                              </div>
                            </div>
                            <div>
                              <div className='flex gap-1'>
                                <span className='text-[0.75rem]'>
                                  {item.speaker}
                                </span>
                                <span className='text-[0.7rem] text-gray-500'>
                                  {item.startTime}
                                </span>
                              </div>
                              <p className='text-[0.65rem]'>{item.speech}</p>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-center gap-4 mt-5 '>
            <JAButton
              className='w-[58vw]'
              onClick={() => createSummaryHandle()}
              disabled={summaryLoading || transcription?.summary}
            >
              {summaryLoading && (
                <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
              )}
              {t('transcription.generate_summary')}
            </JAButton>
            <div className='ja-2-btn-container'>
              <Button
                className='ja-2-button text-[#fff] w-[58vw]'
                onClick={() => setConfirmDeleteDailog((prev) => !prev)}
              >
                {isLoading && (
                  <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                )}
                {t('transcription.delete')}
              </Button>
            </div>
          </div>
        </>
      )}
      <ConfrimDeleteDailog
        confirmDeleteDailog={confirmDeleteDailog}
        setConfirmDeleteDailog={setConfirmDeleteDailog}
        deleteTranscriptionHandle={deleteTranscriptionHandle}
      />
      <GenerateSummaryDialog isDialogOpen={isDialogOpen} />
    </div>
  );
};

export default MTranscriptionDetail;
