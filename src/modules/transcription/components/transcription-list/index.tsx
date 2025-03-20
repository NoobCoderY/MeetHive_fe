import { useEffect, useMemo, useState } from 'react';
import { CustomPagination } from '@/shadcn/components/shared/custom-pagination';
import { LayoutGrid, Columns3, Search } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/shadcn/components/ui/navigation-menu';
import './index.css';
import TranscriptionListView from './transcription-list-view';
import TranscriptionGridView from './transcription-grid-view';
import { Separator } from '@/shadcn/components/ui/separator';
import useResponsive from '@/hooks/useResponsive';
import { useTranslations } from 'use-intl';
import { useListAllTranscriptionQuery } from '../../sevices/transcription';
import { setAllTranscription } from '../../slice/transcriptionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useDebounce } from '@/hooks/useDebounce';
import { useToast } from '@/shadcn/components/ui/use-toast';
import FetchError from '@/shadcn/components/shared/fetch-error';
const TranscriptionList = () => {
  const [layoutView, setLayoutView] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState('');
  const itemsPerPage = 6;
  const t = useTranslations();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const debouncedSearch = useDebounce(search, 300);
  const breakPoints = useResponsive([600, 900, 1400]);
  const { data, refetch, isError, error, isFetching } =
    useListAllTranscriptionQuery({
      page: currentPage,
      pageSize: itemsPerPage,
      search: debouncedSearch,
      filter: selectedFilter,
    });

  const allTranscription = useSelector(
    (state: RootState) => state.transcription.allTranscription
  );

  useEffect(() => {
    if (data) {
      dispatch(setAllTranscription(data.results));
    }
  }, [data, dispatch]);


  useEffect(() => {
    if (isError) {
      toast({
        title: t('error'),
        description: t(error?.data?.error),
        variant: 'destructive',
      });
    }
  }, [isError]);

  const changeLayoutView = (view: string) => {
    view === 'grid' ? setLayoutView(0) : setLayoutView(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
   const totalPages = useMemo(
     () => Math.ceil((data?.count || 0) / itemsPerPage),
     [data]
  );
  
   const handleFilterClick = (filter) => {
     setSelectedFilter(filter);
   };

  return (
    <>
      <div className='mb-4 flex justify-between items-center px-2 flex-wrap sm:mt-0 mt-4'>
        <div className=' flex gap-4 items-center justify-center'>
          <p className='text-2xl font-semibold leading-7'>
            {t('transcription.title')}
          </p>
          <div>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className='text-md'>
                    {t('transcription.filters.title')}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className='grid gap-3 p-2 md:w-[10vw] lg:w-[12vw] justify-center '>
                      <li
                        className={`row-span-3 font-semibold cursor-pointer ${
                          selectedFilter === '1_week' ? 'text-[#777272]' : ''
                        }`}
                        onClick={() => handleFilterClick('1_week')}
                      >
                        {t('transcription.filters.first_filter')}
                        <Separator className='mt-2' />
                      </li>
                      <li
                        className={`row-span-3 font-semibold cursor-pointer ${
                          selectedFilter === '1_month' ? 'text-[#777272]' : ''
                        }`}
                        onClick={() => handleFilterClick('1_month')}
                      >
                        {t('transcription.filters.second_filter')}
                        <Separator className='mt-2' />
                      </li>
                      <li
                        className={`row-span-3 font-semibold cursor-pointer ${
                          selectedFilter === '1_year' ? 'text-[#777272]' : ''
                        }`}
                        onClick={() => handleFilterClick('1_year')}
                      >
                        {t('transcription.filters.third_filter')}
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        <div className='sm:w-[30%] w-[90%] sm:mt-0 mt-4 m-auto sm:m-0'>
          <div className='rounded-lg mr-4 flex relative'>
            <input
              type='text'
              placeholder={t('transcription.filters.search_placeholder')}
              className='rounded-lg border shadow-md pr-8 pl-10 py-2 w-full placeholder:text-[12px] bg-popover text-popover-foreground text-[#969696] !outline-none'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
          errorText='transcriptions'
        />
      ) : (
        <div>
          {breakPoints === 0 ? (
            <TranscriptionGridView
              filterTranscriptions={allTranscription}
              search={search}
              isError={isError}
              isLoading={isFetching}
            />
          ) : layoutView === 0 ? (
            <TranscriptionGridView
              filterTranscriptions={allTranscription}
              search={search}
              isError={isError}
              isLoading={isFetching}
            />
          ) : (
            <TranscriptionListView
              filterTranscriptions={allTranscription}
              search={search}
              isError={isError}
              isLoading={isFetching}
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

export default TranscriptionList;
