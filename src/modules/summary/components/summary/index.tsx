import SummaryCard from '../summary-card';
import SummaryHeader from '../summary-header';
import './index.css';
import { useParams } from 'react-router-dom';
import { useSummaryByIdQuery } from '../../services/summary';
import { LoadingSpinner } from '@/shadcn/components/shared/loader';
import { useToast } from '@/shadcn/components/ui/use-toast';
import { useEffect } from 'react';
import { selectedSummary } from '../../slice/summary';
import { useDispatch } from 'react-redux';
import { useTranslations } from 'use-intl';

const Summary = () => {
  const { summaryId } = useParams();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const t = useTranslations();
  const {
    data,
    isLoading,
    isError,
    error,
    refetch: refetchSummaryById,
  } = useSummaryByIdQuery({ summaryId: summaryId || '' });
 

  useEffect(() => {
    if (isError) {
      toast({
        title: 'Error',
        description: error?.data?.error || t('transcription.summary_crud_warning'),
        variant: 'destructive',
      });
    }
    
  }, [isError])
  
  useEffect(() => {
    if (data) {    
      dispatch(selectedSummary(data?.data))
    }
  }, [data])

  useEffect(() => {
   refetchSummaryById() 
  },[])

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-[60vh] w-full'>
        <LoadingSpinner
        />
      </div>
    );
  }
  

  return (
    <div className='p-5'>
      <SummaryHeader />
      <SummaryCard refetchSummaryById={refetchSummaryById} />
    </div>
  );
};

export default Summary;
