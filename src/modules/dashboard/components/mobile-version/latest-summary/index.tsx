import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/components/ui/card';
import { ChevronsDown, ChevronsUp, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { SummaryItem } from '@/modules/summary/model';
import LatestSummaryCard from '../../latest-summary-card';
import { useTranslations } from 'use-intl';
import { Button } from '@/shadcn/components/ui/button';

interface MLatestSummaryListProps {
  latestSummary: SummaryItem[] | null;
}

const MLatestSummary = ({ latestSummary }: MLatestSummaryListProps) => {
  const [open, setOpen] = useState<boolean>(true);
  const t = useTranslations();
  const isEmpty = !latestSummary?.length;

  return (
    <div className='mt-2 px-1 pb-6'>
      {open ? (
        <Card
          className='glass-panel cursor-pointer border-primary/20'
          onClick={() => setOpen(false)}
        >
          <div className='flex items-center justify-between p-4'>
            <div>
              <p className='text-xs font-semibold uppercase tracking-wider text-primary'>Today</p>
              <CardTitle className='text-base font-semibold'>{t('dashboard.summary_card_title')}</CardTitle>
            </div>
            <Button
              variant='ghost'
              size='icon'
              className='rounded-xl text-primary'
              aria-expanded={false}
            >
              <ChevronsDown className='h-6 w-6' />
            </Button>
          </div>
        </Card>
      ) : (
        <div className='space-y-3'>
          <div className='flex items-center justify-between gap-2'>
            <div>
              <p className='text-xs font-semibold uppercase tracking-wider text-primary'>Today</p>
              <h2 className='text-lg font-bold tracking-tight text-foreground'>{t('dashboard.summary_card_title')}</h2>
            </div>
            <Button
              variant='outline'
              size='icon'
              className='shrink-0 rounded-xl border-primary/30'
              onClick={() => setOpen(true)}
              aria-label='Collapse section'
            >
              <ChevronsUp className='h-5 w-5 text-primary' />
            </Button>
          </div>

          <Card className='glass-panel border-primary/15'>
            <CardHeader className='pb-2'>
              <p className='text-sm text-muted-foreground'>Tap a card to open the full summary.</p>
            </CardHeader>
            <CardContent className='space-y-4 pt-0'>
              {isEmpty ? (
                <div className='flex flex-col items-center rounded-2xl border border-dashed border-primary/25 bg-primary/[0.04] px-4 py-12 text-center'>
                  <div className='mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10'>
                    <Sparkles className='h-6 w-6 text-primary' />
                  </div>
                  <p className='font-semibold text-foreground'>No summaries yet</p>
                  <p className='mt-1 text-sm text-muted-foreground'>New items appear here as they finish processing.</p>
                </div>
              ) : (
                <div className='flex max-h-[70vh] flex-col gap-4 overflow-y-auto no-scrollbar pb-2'>
                  {latestSummary?.map((summary) => (
                    <LatestSummaryCard
                      key={summary.id}
                      summary={summary}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MLatestSummary;
