import React from 'react';
import SummaryGridCard from './summary-grid-card';
import { SummaryItem } from '@/modules/summary/model';
import SkeletonLoader from '@/shadcn/components/shared/skelton-loader';

interface SummaryGridViewProps {
  summaries: SummaryItem[];
  isLoading: boolean;
  isError: boolean;
}

const SummaryGridView = ({
  summaries,
  isError,
  isLoading,
}: SummaryGridViewProps) => {

  if (isLoading || isError) {
    return (
      <SkeletonLoader
        count={6}
        height='h-[200px]'
        width='w-[350px]'
      />
    );
  }

  return (
    <div className='flex  flex-wrap gap-6  sm:px-6 justify-center items-center sm:justify-normal'>
      {summaries?.map((summary: SummaryItem) => {
        return (
          <SummaryGridCard
            summary={summary}
            key={summary?.id}
          />
        );
      })}
    </div>
  );
};

export default SummaryGridView;
