import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/shadcn/components/ui/table';
import {  Captions } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shadcn/components/ui/button';
import { SummaryItem } from '@/modules/summary/model';
import { useTranslations } from 'use-intl';
import SkeletonLoader from '@/shadcn/components/shared/skelton-loader';



interface SummaryListViewProps {
  summaries: SummaryItem[];
  isLoading: boolean
  isError:boolean
}


const SummaryListView = ({summaries,isError,isLoading}:SummaryListViewProps) => {
  const navigate = useNavigate();
  const t = useTranslations();
   if (isLoading || isError) {
     return (
       <SkeletonLoader
         count={4}
         height='h-[10vh]'
         width='w-[100%]'
         className='!flex-col !gap-4'
       />
     );
   }
  return (
    <div className='p-4 md:p-6 lg:p-8'>
      <div className='overflow-x-auto '>
        <Table className='min-w-full'>
          <TableHeader>
            <TableRow className='hover:bg-transparent'>
              <TableHead className='whitespace-nowrap'>
                {' '}
                {t('transcription.summary')}
              </TableHead>
              <TableHead className='whitespace-nowrap'>
                {t('transcription.transcription')}
              </TableHead>
              <TableHead className='text-center whitespace-nowrap'>
                {t('meeting.project')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {summaries?.map((summary: SummaryItem) => (
              <TableRow
                key={`${summary?.id}`}
                className='cursor-pointer '
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/summary/detail/${summary?.id}`)
                }}
              >
                <TableCell className='font-medium h-[5vh] sm:h-[3vh] '>
                  <div className='flex items-center gap-3'>
                    <span className='flex w-[20px] h-[20px] items-center'>
                      <Captions />
                    </span>
                    <span className='ml-3 cursor-pointer'>
                      {summary?.title}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{summary?.transcription?.title}</TableCell>
                <TableCell className='text-center'>
                  {summary?.project?.name}
                </TableCell>

                <TableCell className='text-right'>
                  <div className=''>
                    <Button
                      className='cursor-pointer mr-4 !w-[8rem]'
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/summary/detail/${summary?.id}`);
                      }}
                    >
                      {t('meeting.view_meeting')}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SummaryListView;
