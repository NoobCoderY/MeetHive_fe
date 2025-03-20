import { SummaryItem } from '@/modules/summary/model';
import { convertIsoToDate } from '../../utils';
import { Dot } from 'lucide-react';
import { selectedSummary } from '@/modules/summary/slice/summary';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface LatestSummaryCardProps {
  summary: SummaryItem;
}

const LatestSummaryCard = ({ summary }: LatestSummaryCardProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToSummaryPage = () => {
    dispatch(selectedSummary(summary));
    navigate(`/summary/detail/${summary?.id}`);
  }
  return (
    <div className='sm:w-[22%] w-[100%] cursor-pointer'
      onClick={goToSummaryPage}
    >
      <div className='latest-summary-card-outer'>
        <div className='latest-summary-card-inner'>
          <div className='px-3 pt-2  overflow-scroll flex flex-col gap-1'>
            <p className='font-semibold text-[0.85rem]'>{summary?.title}</p>
            <div className='flex items-center'>
              <p className='text-[0.65rem]'>
                {convertIsoToDate(summary?.created_at)}
              </p>
               <Dot/>
              <p className='text-[0.65rem]'>
                {summary?.project?.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestSummaryCard;
