import { useGetMonthlyUsageQuery } from '@/modules/core/services/restriction';
import { useEffect } from 'react';
import LatestSummary from '../components/latest-summary';
import { useToast } from '@/shadcn/components/ui/use-toast';
const Home = () => {
  const {isError: isMonthlyUsageError,refetch,error,} = useGetMonthlyUsageQuery('');
  const { toast } = useToast();

  useEffect(() => {
    if (isMonthlyUsageError) {
      toast({
        title: 'Error',
        description: error?.data?.error || 'Something went wrong',
        variant: 'destructive',
      });
    }
  }, [isMonthlyUsageError]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return <LatestSummary />;
};

export default Home;
