import { Card } from '@/shadcn/components/ui/card';
import { ChevronsDown, ChevronsUp } from 'lucide-react';
import { useState } from 'react';
import { SummaryItem } from '@/modules/summary/model';
import LatestSummaryCard from '../../latest-summary-card';
import { useTranslations } from 'use-intl';

interface MLatestSummaryListProps {
  latestSummary: SummaryItem[] | null;
}

const MLatestSummary = ({ latestSummary }: MLatestSummaryListProps) => {
  const [toggleTodoAccordian, setToggleTodoAccordian] = useState<boolean>(true);
  const t = useTranslations();
  
  // Toggle Accordion Handler
  const handleToggle = () => setToggleTodoAccordian((prevState) => !prevState);
  return (
    <div className='mt-6 p-2'>
      {toggleTodoAccordian ? (
        <Card
          className='flex justify-between p-2'
          onClick={handleToggle}
        >
          <h1 className='text-md'>{t('dashboard.summary_card_title')}</h1>
          <span>
            <ChevronsDown
              color='#89d289'
              size={28}
            />
          </span>
        </Card>
      ) : (
        <div className='relative'>
          <div className='absolute left-2 text-md'>
            {t('dashboard.summary_card_title')}
          </div>
          <div
            className='  absolute right-[4px] top-1 z-10 w-[21.3%] flex justify-center items-center'
            onClick={handleToggle}
          >
            <div className='card_close_button_outer w-[100%] h-[100%] '>
              <div className='card_close_button_inner w-[100%] h-[100%]  flex justify-center items-center py-[0.13rem] pl-[3px] '>
                <ChevronsUp
                  size={27}
                  color='#97ec97'
                />
              </div>
            </div>
          </div>
          <div className='todos_summary_outer_card w-[100%] h-[100%]'>
            <div className='todos_summary_inner_card w-[100%] h-[100%]'>
              <div className='  px-3 pt-14 pb-10 h-[25rem]'>
                <div className='overflow-y-scroll h-72 flex flex-col gap-3 no-scrollbar'>
                  {latestSummary?.map((summary) => (
                    <LatestSummaryCard summary={summary} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MLatestSummary;
