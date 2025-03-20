import  { useEffect, useState } from 'react';
import './index.css';
import LatestSummaryCard from '../latest-summary-card';
import { useListAllSummaryQuery } from '@/modules/summary/services/summary';
import { LoadingSpinner } from '@/shadcn/components/shared/loader';
import { SummaryItem } from '@/modules/summary/model';
import { useToast } from '@/shadcn/components/ui/use-toast';
import { useTranslations } from 'use-intl';
import useResponsive from '@/hooks/useResponsive';
import MLatestSummary from '../mobile-version/latest-summary';



const LatestSummary = () => {
  const { toast } = useToast();
  const t = useTranslations();
  const breakPoints = useResponsive([600, 900, 1400]);
  const [filteredData, setFilteredData] = useState<SummaryItem[]>();

  const { data, isLoading, error } = useListAllSummaryQuery({
    page: 1,
    pageSize: 6,
    search:''
  });


  /**
   * Filters `data.results` to include only items created today and updates `filteredData` state.
   *
   * @dependency {Array} [data] - Trigger effect when `data` changes.
   */

  useEffect(() => {
    const result: SummaryItem[] = [];
    const today = new Date();
    if (data) {
      data.results.forEach((item) => {
        const createdAtDate = new Date(item.created_at);
        if (createdAtDate.toDateString() === today.toDateString()) {
          result.unshift(item);
        }
      });
      setFilteredData(result);
    }
  }, [data]);

  // this is added because limit the render of page
  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: error?.data?.error || t('dashboard.error'),
        variant: 'destructive',
      });
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-[60vh]'>
        <LoadingSpinner
        />
      </div>
    );
  }

  return (
    <>
      {breakPoints === 0 ? (
        <MLatestSummary latestSummary={filteredData} />
      ) : (
        <div className='p-6 relative'>
          <div className='absolute ml-2 font-bold text-2xl top-3'>
            {t('dashboard.summary_card_title')}
          </div>
          <div className='latest-summary-outer'>
            <div className='latest-summary-inner '>
              <div className='pt-14 px-6 pb-3 flex gap-5 flex-wrap overflow-y-scroll h-[65vh]'>
                {filteredData?.map((summary) => {
                  return (
                    <LatestSummaryCard
                      key={summary?.id}
                      summary={summary}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LatestSummary;
