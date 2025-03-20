import { Button } from '@/shadcn/components/ui/button';
import { Speech } from 'lucide-react';
import { useDeleteTranscriptionMutation } from '../../sevices/transcription';
import { useTranslations } from 'use-intl';
import { useEffect, useState } from 'react';
import { useToast } from '@/shadcn/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { selectedTranscription } from '../../slice/transcriptionSlice';
import { useDispatch } from 'react-redux';
import ConfrimDeleteDailog from '../confirm-delete-transcription';
import JAButton from '@/shadcn/atoms/ja-button';
import { useCreateSummaryMutation } from '@/modules/summary/services/summary';
import GenerateSummaryDialog from '../generate-summary-dailog';
import { useParams } from 'react-router-dom';
import { useTranscriptionByIdQuery } from '../../sevices/transcription';
import { LoadingSpinner } from '@/shadcn/components/shared/loader';

const TranscriptionDetail = () => {
  const [confirmDeleteDailog, setConfirmDeleteDailog] =useState<boolean>(false);
   const { transcriptionId } = useParams();
  const [checkGenerateSummaryDialogOpen, setCheckGenerateSummaryDialogOpen] =useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [deleteTranscription, { isLoading, isError, isSuccess }] =useDeleteTranscriptionMutation();
 const {data: transcriptionData,error: transcriptionError,isSuccess: isTranscriptionSuccess,refetch: refetchTranscriptionById,isLoading:transcriptionLoading,
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
      })
    }
  }, [isTranscriptionSuccess,transcriptionError]);

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
    <>
      <div className='px-4'>
        <div className='relative'>
          <div className='absolute pl-[0.7rem]'>
            <h1 className='text-2xl font-bold'>{t('transcription.title')}</h1>
          </div>
          <div className='transcription_outer_card  '>
            <div className='transcription_inner_card '>
              <div className='mt-14 mb-10'>
                <div className='flex flex-col gap-4 h-64 overflow-y-scroll'>
                  {transcription?.status === 'pending' ? (
                    <div className='flex justify-center items-center h-[100%]'>
                      <p className='text-2xl font-semibold'>
                        {t('transcription.pending_transcription_msg')}
                      </p>
                    </div>
                  ) : (
                    transcription?.text?.content?.map((item, index) => {
                      return (
                        <div
                          className='flex gap-3 items-center'
                          key={`${index} ${item}`}
                        >
                          <div className=' min-w-[35px] min-h-[35px] rounded-[50%] bg-slate-400 flex justify-center items-center'>
                            <Speech size={20} />
                          </div>
                          <div>
                            <div className='flex gap-1 '>
                              <span className='text-[0.85rem] font-semibold'>
                                {item.speaker}
                              </span>
                              <span className='text-[0.8rem] text-[#B9BBBD]'>
                                {item.startTime}
                              </span>
                            </div>
                            <p className='text-[0.75rem]  text-[#E0E2E4] transcription_detail_text'>
                              {item.speech}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='flex justify-end items-center gap-1 mt-5 mr-5'>
            <JAButton
              className='w-[17vw]'
              onClick={() => createSummaryHandle()}
              disabled={transcription?.summary}
            >
              {summaryLoading && (
                <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
              )}
              {t('transcription.generate_summary')}
            </JAButton>

            <div className='ja-2-btn-container'>
              <Button
                className='ja-2-button text-[#fff] w-[17vw]'
                onClick={() => setConfirmDeleteDailog((prev) => !prev)}
              >
                {' '}
                {isLoading && (
                  <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                )}
                {t('transcription.delete')}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ConfrimDeleteDailog
        confirmDeleteDailog={confirmDeleteDailog}
        setConfirmDeleteDailog={setConfirmDeleteDailog}
        deleteTranscriptionHandle={deleteTranscriptionHandle}
      />
      <GenerateSummaryDialog isDialogOpen={isDialogOpen} />
    </>
  );
};

export default TranscriptionDetail;
