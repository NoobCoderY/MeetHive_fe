import { Columns3, LayoutGrid, Search } from 'lucide-react';
import useResponsive from '@/hooks/useResponsive';
import SummaryGridView from './summary-grid-view';
import SummaryListView from './summary-list-view';
import { setAllSummary } from '../../slice/summary';
import { useListAllSummaryQuery } from '../../services/summary';
import { useSelector, useDispatch } from 'react-redux';
import { useDebounce } from '@/hooks/useDebounce';
import { useState, useEffect, useMemo} from 'react';
import { RootState } from '@/store/store';
import { useTranslations } from 'use-intl';
import { CustomPagination } from '@/shadcn/components/shared/custom-pagination';
import FetchError from '@/shadcn/components/shared/fetch-error';

const SummaryList = () => {
  const breakPoints = useResponsive([600, 900, 1400]);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [layoutView, setLayoutView] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const { data, refetch, isLoading, isError } = useListAllSummaryQuery({
    page: currentPage,
    pageSize: itemsPerPage,
    search: debouncedSearch,
  });

  const dispatch = useDispatch();

  const t = useTranslations();

  const allSummary = useSelector(
    (state: RootState) => state.summary.allSummary
  );


  useEffect(() => {
    if (data) {
      dispatch(setAllSummary(data?.results));
    }
  }, [data, dispatch]);


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const totalPages = useMemo(
    () => Math.ceil((data?.count || 0) / itemsPerPage),
    [data]
  );

  const changeLayoutView = (view: string) => {
    view === 'grid' ? setLayoutView(0) : setLayoutView(1);
  };
  return (
    <>
      <div className='mb-4 flex justify-between items-center px-2 flex-wrap sm:mt-0 mt-4'>
        <div className=' flex gap-4 items-center justify-center'>
          <p className='text-2xl font-semibold leading-7'>
            {' '}
            {t('transcription.summary')}
          </p>
          <div></div>
        </div>
        <div className='sm:w-[30%] w-[90%] sm:mt-0 mt-4 m-auto sm:m-0'>
          <div className='rounded-lg mr-4 flex relative'>
            <input
              type='text'
              placeholder='Type summary name for search'
              className='rounded-lg border shadow-md pr-8 pl-10 py-2 w-full placeholder:text-[12px] bg-popover text-popover-foreground text-[#969696] !outline-none'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label='Search summaries'
              aria-busy={isLoading}
            />
            <span className='absolute top-3 left-3'>
              <Search
                size={22}
                color='#969696'
              />
            </span>
          </div>
        </div>
      </div>
      {breakPoints != 0 && (
        <div className='mb-4 flex justify-end px-2'>
          <div className=' w-[10%]  transcription_list_layout flex border-[1px] rounded-lg'>
            <div
              className={`p-2 basis-[50%] flex justify-center items-center border-r-[1px]  cursor-pointer ${
                layoutView === 0
                  ? 'bg-[#89D289] rounded-tl-lg rounded-bl-lg '
                  : ''
              }`}
              onClick={() => {
                changeLayoutView('grid');
              }}
            >
              <LayoutGrid size={25} />
            </div>
            <div
              className={`p-2 basis-[50%] cursor-pointer  flex justify-center items-center  ${
                layoutView === 1
                  ? 'bg-[#89D289] rounded-tr-lg rounded-br-lg'
                  : ''
              }`}
              onClick={() => {
                changeLayoutView('list');
              }}
            >
              <Columns3 size={25} />
            </div>
          </div>
        </div>
      )}
      {isError ? (
        <FetchError
          refetch={refetch}
          errorText='summaries'
        />
      ) : (
        <div>
          {breakPoints === 0 ? (
            <SummaryGridView
              summaries={allSummary}
              isLoading={isLoading}
              isError={isError}
            />
          ) : layoutView === 0 ? (
            <>
              <SummaryGridView
                summaries={allSummary}
                isLoading={isLoading}
                isError={isError}
              />
            </>
          ) : (
            <SummaryListView
              summaries={allSummary}
              isLoading={isLoading}
              isError={isError}
            />
          )}
          <div className='mt-5'>
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SummaryList;
