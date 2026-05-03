import { SummaryItem } from '@/modules/summary/model';
import { convertIsoToDate } from '../../utils';
import { selectedSummary } from '@/modules/summary/slice/summary';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/shadcn/components/ui/card';
import { Badge } from '@/shadcn/components/ui/badge';
import { Calendar, ChevronRight, Folder } from 'lucide-react';

interface LatestSummaryCardProps {
  summary: SummaryItem;
}

const LatestSummaryCard = ({ summary }: LatestSummaryCardProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToSummaryPage = () => {
    dispatch(selectedSummary(summary));
    navigate(`/summary/detail/${summary?.id}`);
  };

  return (
    <Card
      role='button'
      tabIndex={0}
      onClick={goToSummaryPage}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          goToSummaryPage();
        }
      }}
      className='group cursor-pointer border-border/60 bg-card/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-glow-sm'
    >
      <CardHeader className='space-y-3 pb-2'>
        <div className='flex items-start justify-between gap-2'>
          <h2 className='line-clamp-2 min-h-[2.5rem] text-left text-base font-semibold leading-snug tracking-tight text-foreground group-hover:text-primary'>
            {summary?.title}
          </h2>
          <ChevronRight className='h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-primary' />
        </div>
        <div className='flex flex-wrap items-center gap-2'>
          <Badge
            variant='chip'
            className='font-normal'
          >
            <Calendar className='mr-1 h-3 w-3 opacity-80' />
            {convertIsoToDate(summary?.created_at)}
          </Badge>
          {summary?.project?.name && (
            <Badge
              variant='pill'
              className='max-w-full truncate font-normal normal-case tracking-normal'
            >
              <Folder className='mr-1 h-3 w-3' />
              <span className='truncate'>{summary.project.name}</span>
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className='pt-0'>
        <p className='text-xs text-muted-foreground'>Click to open summary</p>
      </CardContent>
    </Card>
  );
};

export default LatestSummaryCard;
