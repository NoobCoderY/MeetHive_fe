import { useEffect, useState } from 'react';
import LatestSummaryCard from '../latest-summary-card';
import { useListAllSummaryQuery } from '@/modules/summary/services/summary';
import { LoadingSpinner } from '@/shadcn/components/shared/loader';
import { SummaryItem } from '@/modules/summary/model';
import { useToast } from '@/shadcn/components/ui/use-toast';
import { useTranslations } from 'use-intl';
import useResponsive from '@/hooks/useResponsive';
import MLatestSummary from '../mobile-version/latest-summary';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shadcn/components/ui/card';
import { Sparkles } from 'lucide-react';

const LatestSummary = () => {
  const { toast } = useToast();
  const t = useTranslations();
  const breakPoints = useResponsive([600, 900, 1400]);
  const [filteredData, setFilteredData] = useState<SummaryItem[]>();

  const { data, isLoading, error } = useListAllSummaryQuery({
    page: 1,
    pageSize: 6,
    search: '',
  });

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
      <div className='flex h-[50vh] items-center justify-center'>
        <LoadingSpinner />
      </div>
    );
  }

  if (breakPoints === 0) {
    return <MLatestSummary latestSummary={filteredData} />;
  }

  const isEmpty = !filteredData?.length;

  return (
    <div className='mx-auto max-w-7xl'>
      <div className='mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.2em] text-primary'>Overview</p>
          <h1 className='mt-2 text-3xl font-bold tracking-tight text-gradient-brand md:text-4xl'>
            {t('dashboard.summary_card_title')}
          </h1>
          <p className='mt-2 max-w-xl text-muted-foreground'>
            Summaries captured today — open any card to review detail and share with your team.
          </p>
        </div>
      </div>

      <Card className='glass-panel border-primary/15'>
        <CardHeader className='border-b border-border/40 pb-4'>
          <CardTitle className='text-lg font-semibold'>Today&apos;s activity</CardTitle>
          <CardDescription>
            Voice intelligence outputs grouped by recency. Cards update as new summaries complete.
          </CardDescription>
        </CardHeader>
        <CardContent className='pt-6'>
          {isEmpty ? (
            <div className='flex flex-col items-center justify-center rounded-2xl border border-dashed border-primary/25 bg-primary/[0.04] px-6 py-16 text-center'>
              <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 shadow-glow-sm'>
                <Sparkles className='h-8 w-8 text-primary' />
              </div>
              <p className='text-lg font-semibold text-foreground'>Nothing new yet today</p>
              <p className='mt-2 max-w-sm text-sm text-muted-foreground'>
                Run a transcription or generate a summary — your latest work will land here automatically.
              </p>
            </div>
          ) : (
            <div className='grid gap-5 sm:grid-cols-2 xl:grid-cols-3'>
              {filteredData?.map((summary) => (
                <LatestSummaryCard
                  key={summary?.id}
                  summary={summary}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LatestSummary;
