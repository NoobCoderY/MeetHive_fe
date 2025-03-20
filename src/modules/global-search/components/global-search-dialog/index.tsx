import {
  Dialog,
  DialogContent,
  DialogHeader,
} from '@/shadcn/components/ui/dialog';
import React, { useEffect } from 'react';
import { FileSearch, Search, Captions } from 'lucide-react';
import { Input } from '@/shadcn/components/ui/input';
import { Separator } from '@/shadcn/components/ui/separator';
import { useState } from 'react';
import { tabs } from '../../utils';
import { useDebounce } from '@/hooks/useDebounce';
import { useNavigate } from 'react-router-dom';
import { useTranslations } from 'use-intl';
import { useListGlobalSearchItemsQuery } from '../../services/globalSearch';
import { Summary, Transcription } from '../../models';

interface IGlobalSearchDialogProps {
  setGlobalSearchDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  globalSearch: boolean;
}

const GlobalSearchDialog = ({
  setGlobalSearchDialogOpen,
  globalSearch,
}: IGlobalSearchDialogProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);
  const navigate = useNavigate();

  const t = useTranslations();

  const { data: globalSearchData,refetch: refetchGlobalSearch} =useListGlobalSearchItemsQuery({  searchQuery: debouncedSearch,});


  const resetStates = () => {
    setActiveTab(tabs[0]);
    setSearchQuery('');
    refetchGlobalSearch();
  };

  useEffect(() => {
    refetchGlobalSearch();
  },[debouncedSearch]);

  return (
    <Dialog
      open={globalSearch}
      onOpenChange={(isOpen) => {
        setGlobalSearchDialogOpen(isOpen);
        if (!isOpen) {
          resetStates();
        }
      }}
    >
      <DialogContent className='sm:max-w-[550px] max-w-[350px]'>
        <DialogHeader>
          <div className='p-2 flex justify-between items-center'>
            <div className='basis-[10%]'>
              <Search />
            </div>
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('global_search.search_placeholder')}
              className='basis-[92%] focus-visible:ring-0 focus-visible:outline-none !border-b-[1px] border-t-[0px] border-r-[0px] border-l-[0px] border-[#9c9b9b] rounded-none'
            />
          </div>
          <Separator orientation='horizontal' />
        </DialogHeader>
        <div className='h-[45vh] overflow-y-scroll'>
          {/* Tabs */}
          <div className='mx-auto'>
            <div className='flex gap-6 mb-5 relative'>
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 text-lg font-medium transition-colors duration-200 ${
                    activeTab.id === tab.id
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  {t(`global_search.tabs.tab_${index}`)}
                </button>
              ))}
              <Separator className='absolute bottom-0 left-0 right-0' />
            </div>
          </div>

          {/* Display filtered results */}
          {activeTab.id === 'all' && (
            <div>
              {/* Transcriptions Section */}
              {globalSearchData?.data?.transcriptions.length > 0 && (
                <div>
                  <h1>Transcriptions</h1>
                  <Separator />
                  <div className='flex flex-col gap-2 mt-2'>
                    {globalSearchData?.data?.transcriptions?.map(
                      (transcription: Transcription) => (
                        <div
                          key={transcription?.id}
                          className='flex  p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer items-center'
                          onClick={() => {
                            navigate(
                              `/transcription/detail/${transcription?.id}`
                            );
                            setGlobalSearchDialogOpen(false);
                          }}
                        >
                          <div className='mr-4 mt-1 p-2 rounded-full bg-primary/10'>
                            <Captions className='h-4 w-4' />
                          </div>
                          <div className='flex-grow'>
                            <h3 className='text-sm font-semibold mb-1'>
                              {transcription?.title}
                            </h3>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Summaries Section */}
              {globalSearchData?.data?.summaries.length > 0 && (
                <div>
                  <h1 className='mt-4'>Summaries</h1>
                  <Separator />
                  <div className='flex flex-col gap-2 mt-2'>
                    {globalSearchData?.data?.summaries?.map(
                      (summary: Summary) => (
                        <div
                          key={summary?.id}
                          className='flex  p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer items-center'
                          onClick={() => {
                            navigate(`/summary/detail/${summary?.id}`);
                            setGlobalSearchDialogOpen(false);
                          }}
                        >
                          <div className='mr-4 mt-1 p-2 rounded-full bg-primary/10'>
                            <FileSearch className='h-4 w-4' />
                          </div>
                          <div className='flex-grow'>
                            <h3 className='text-sm font-semibold mb-1'>
                              {summary?.title}
                            </h3>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* No Results Section */}
              {globalSearchData?.data?.summaries.length === 0 &&
                globalSearchData?.data?.transcriptions?.length === 0 && (
                  <div className='text-center mt-4'>
                    <p>{t('transcription.no_result')}</p>
                  </div>
                )}
            </div>
          )}

          {/* Transcription Tab */}
          {activeTab.id === 'transcription' && (
            <div className='flex flex-col gap-2'>
              {globalSearchData?.data?.transcriptions.length > 0 ? (
                globalSearchData?.data?.transcriptions?.map((transcription) => (
                  <div
                    key={transcription.id}
                    className='flex  p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer items-center'
                    onClick={() => {
                      navigate(`/transcription/detail/${transcription?.id}`);
                      setGlobalSearchDialogOpen(false);
                    }}
                  >
                    <div className='mr-4 mt-1 p-2 rounded-full bg-primary/10'>
                      <Captions className='h-4 w-4' />
                    </div>
                    <div className='flex-grow'>
                      <h3 className='text-sm font-semibold mb-1'>
                        {transcription.title}
                      </h3>
                    </div>
                  </div>
                ))
              ) : (
                <div className='text-center mt-4'>
                  <p>{t('transcription.null_transcription')}</p>
                </div>
              )}
            </div>
          )}

          {/* Summary Tab */}
          {activeTab.id === 'summary' && (
            <div className='flex flex-col gap-2'>
              {globalSearchData?.data?.summaries.length > 0 ? (
                globalSearchData?.data?.summaries?.map((summary) => (
                  <div
                    key={summary.id}
                    className='flex  p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer items-center'
                    onClick={() => {
                      navigate(`/summary/detail/${summary?.id}`);
                      setGlobalSearchDialogOpen(false);
                    }}
                  >
                    <div className='mr-4 mt-1 p-2 rounded-full bg-primary/10'>
                      <FileSearch className='h-4 w-4' />
                    </div>
                    <div className='flex-grow'>
                      <h3 className='text-sm font-semibold mb-1'>
                        {summary.title}
                      </h3>
                    </div>
                  </div>
                ))
              ) : (
                <div className='text-center mt-4'>
                  <p>{t('transcription.null_summary')}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GlobalSearchDialog;
