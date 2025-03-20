import { useTranslations } from 'use-intl';
import './index.css';
import { useCallback, useState } from 'react';
import { Card } from '@/shadcn/components/ui/card';
import { ChevronsDown, ChevronsUp, Plus } from 'lucide-react';
import EditSummaryCard from '../../edit-summary-card';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  BaseQueryApi,
  FetchArgs,
  QueryActionCreatorResult,
  QueryDefinition,
} from '@reduxjs/toolkit/query';

interface MSummaryCardProps {
  refetchSummaryById: () => QueryActionCreatorResult<
    QueryDefinition<
      { summaryId: string },
      (
        args: string | FetchArgs,
        api: BaseQueryApi,
        extraOptions: object
      ) => Promise<any>,
      'Summary' | 'Usage',
      any,
      'summmaryApi'
    >
  >;
}

const MSummaryCard = ({ refetchSummaryById }: MSummaryCardProps) => {
  const [toggleSummaryAccordian, setToggleSummaryAccordian] =
    useState<boolean>(true);
  const [editSummaryContent, setEditSummaryContent] = useState<string>('');
  const [showEditCard, setShowEditcard] = useState<boolean>(false);
  const selectSummary = useSelector(
    (state: RootState) => state.summary.selectedSummary
  );
  const t = useTranslations();
  const toggleEditCard = useCallback(() => {
    setShowEditcard(!showEditCard);
  }, [showEditCard]);

  return (
    <div className='p-2'>
      {toggleSummaryAccordian ? (
        <Card
          className='flex justify-between p-2'
          onClick={() => setToggleSummaryAccordian(!toggleSummaryAccordian)}
        >
          <h1 className='text-md'> {t('transcription.summary')}</h1>
          <span>
            <ChevronsDown
              color='#89d289'
              size={28}
            />
          </span>
        </Card>
      ) : (
        <div className='relative'>
          <div className='absolute left-2 text-xl'>
            {' '}
            {t('transcription.summary')}
          </div>
          <div
            className='  absolute right-[5px] top-1 z-10 w-[21.3%] flex justify-center items-center'
            onClick={() => setToggleSummaryAccordian(!toggleSummaryAccordian)}
          >
            <div className='card_close_button_outer w-[100%] h-[100%] '>
              <div className='card_close_button_inner w-[100%] h-[100%]  flex justify-center items-center py-[0.1rem] pl-[3px] '>
                <ChevronsUp
                  size={27}
                  color='#97ec97'
                />
              </div>
            </div>
          </div>
          <div className='todos_summary_outer_card w-[100%] h-[100%]'>
            <div className='todos_summary_inner_card w-[100%] h-[100%]'>
              {selectSummary?.summary==='pending' ? (
                <div className='px-3 pt-12 pb-6 h-[22rem] flex justify-center items-center'>
                  <p> {t('transcription.pending_summary_msg')}</p>
                </div>
              ) : !showEditCard ? (
                <div className='  px-3 pt-12 pb-6 h-[22rem]'>
                  <div className='overflow-auto max-h-[14rem]'>
                    <p className='text-[12px] leading-6 font-extralight break-words'>
                      {selectSummary?.summary}
                    </p>
                  </div>
                  <div className='flex items-center justify-between mt-7 '>
                    <div className='text-[gray] sm:text-sm  md:text-sm lg:text-sm text-[0.7rem]'>
                      Genrated by KI.M(AI)
                    </div>
                    {selectSummary?.is_editable && (
                      <div
                        className={`flex gap-2 text-[#97ec97] add_button_text_shadow px-4  sm:text-sm  md:text-sm lg:text-sm text-[0.7rem] font-bold items-center cursor-pointer ${
                          selectSummary === null &&
                          'pointer-events-none opacity-50'
                        } `}
                        onClick={() => toggleEditCard()}
                      >
                        <span>
                          <Plus size={20} />
                        </span>
                        <span>{t('transcription.edit_point')}</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className='  px-3 pt-12 pb-6 h-[22rem]'>
                  <EditSummaryCard
                    refetchSummaryById={refetchSummaryById}
                    setShowEditcard={setShowEditcard}
                    editSummaryContent={editSummaryContent}
                    setEditSummaryContent={setEditSummaryContent}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MSummaryCard;
