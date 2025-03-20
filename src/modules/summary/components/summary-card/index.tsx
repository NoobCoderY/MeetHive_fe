import  { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'use-intl';
import EditSummaryCard from '../edit-summary-card';
import { Plus } from 'lucide-react';
import { Button } from '@/shadcn/components/ui/button';
import JAButton from '@/shadcn/atoms/ja-button';
import SaveSummaryDialog from '../save-summary-warning-dialog';
import { useLocale } from '@/modules/core/contexts/locale.context';
import DeleteSummaryDialog from '../delete-summary-dailog';
import { useSelector,useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import {
  BaseQueryApi,
  FetchArgs,
  QueryActionCreatorResult,
  QueryDefinition,
} from '@reduxjs/toolkit/query';
import { useUpdateSummaryMutation } from '../../services/summary';
import { selectedSummary } from '../../slice/summary';
import { useDeleteSummaryMutation } from '../../services/summary';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/shadcn/components/ui/use-toast';
import { ReloadIcon } from '@radix-ui/react-icons';

interface SummaryCardProps {
  refetchSummaryById: () => QueryActionCreatorResult<
    QueryDefinition<
      {
        summaryId: string;
      },
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

const SummaryCrd = ({ refetchSummaryById }: SummaryCardProps) => {
  const [showEditCard, setShowEditcard] = useState<boolean>(false);
  const navigate = useNavigate();
  const { summaryId } = useParams();
  const [editSummaryContent, setEditSummaryContent] = useState<string>('');
  const [isSaveConfirm, setIsSaveConfirm] = useState<boolean>(false);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState<boolean>(false);
  const toggleEditCard = useCallback(() => {
    setShowEditcard(!showEditCard);
  }, [showEditCard]);
  const t = useTranslations();
  const dispatch=useDispatch()
  const [updateSummary, { isLoading }] = useUpdateSummaryMutation();
  const [deleteSummary,{isLoading:deleteLoading}]=useDeleteSummaryMutation()

  const { locale } = useLocale();
  const {toast}=useToast()
  const selectSummary = useSelector(
    (state: RootState) => state.summary.selectedSummary
  );

  const saveSummary = async () => {
    try {
      await updateSummary({
        title: selectSummary?.title,
        summaryId: selectSummary?.id,
        summary: editSummaryContent,
        isEditable: false,
      }).unwrap();
      refetchSummaryById();
      setIsSaveConfirm(false);
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error?.data?.error || t('transcription.summary_crud_warning'),
        variant: 'destructive',
      });  
    }
  }

  const handleDeleteSummary = useCallback(async () => {
    try { 
      await deleteSummary({
        summaryId: summaryId,
      }).unwrap();
      setIsDeleteConfirm(false);
      dispatch(selectedSummary(null));
      navigate('/summary/list')
    } catch (error) {
      toast({
        title: 'Error',
        description: error?.data?.error || t('transcription.summary_crud_warning'),
        variant: 'destructive',
      });   
    }
  }, []);

  useEffect(() => {
    if (selectSummary) {
      setEditSummaryContent(selectSummary?.summary);
    }
   }, [selectSummary]);

  return (
    <>
      <div className='outer_todo_summary_card mt-6'>
        <div className='inner_todo_summary_card'>
          <div className=' flex mb-20 mt-4 '>
            {/* Todo Part */}
            <div className='basis-[50%] mt-7 border-r-[1px] border-[gray] border-opacity-30'>
              <div className='h-72 overflow-y-scroll  flex justify-center items-center'>
                <div className=''>
                  {
                    <div className=' w-[80%] text-xl font-semibold'>
                      {t('transcription.todo_restriction')}
                    </div>
                  }
                </div>
              </div>
            </div>
            {/* summary Part */}
            <div className='basis-[50%] mt-7'>
              {selectSummary?.status==='pending' ? (
                <div className='flex justify-center items-center h-[100%] text-xl font-semibold'>
                  {t('transcription.pending_summary_msg')}
                </div>
              ) : showEditCard ? (
                <EditSummaryCard
                  setShowEditcard={setShowEditcard}
                  editSummaryContent={editSummaryContent}
                  setEditSummaryContent={setEditSummaryContent}
                  refetchSummaryById={refetchSummaryById}
                />
              ) : (
                <div className='p-4'>
                  <div className='w-[80%] overflow-auto max-h-64 '>
                    <p className='text-sm leading-6 font-extralight break-words'>
                      {selectSummary?.summary}
                    </p>
                  </div>
                  <div className='flex items-center justify-between mt-7'>
                    <div className='text-[gray] text-sm'>
                      Genrated by KI.M(AI)
                    </div>
                    {selectSummary?.is_editable && (
                      <div
                        className={`flex gap-2 text-[#97ec97] add_button_text_shadow px-4 text-sm font-bold items-center cursor-pointer ${
                          selectSummary?.summary === null &&
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
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-end items-center gap-1 mt-5 '>
        <div className='ja-2-btn-container'>
          <Button
            className={`${
              locale === 'de' ? 'w-[15rem]' : 'w-[10rem]'
            } ja-2-button`}
            disabled={selectSummary?.status === 'pending'}
            onClick={() => setIsDeleteConfirm(true)}
          >
            {deleteLoading && (
              <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
            )}
            {t('transcription.delete_summary')}
          </Button>
        </div>
        <div>
          <JAButton
            variant='outline'
            className={`${
              locale === 'de' ? 'w-[15rem]' : 'w-[10rem]'
            } Ja-button-save-summary`}
            disabled={!selectSummary?.is_editable}
            onClick={() => setIsSaveConfirm(true)}
          >
            {isLoading && <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />}
            {t('transcription.save_summary')}
          </JAButton>
        </div>
      </div>
      <SaveSummaryDialog
        isSaveConfirm={isSaveConfirm}
        setIsSaveConfirm={setIsSaveConfirm}
        saveSummary={saveSummary}
        saveLoading={isLoading}
      />
      <DeleteSummaryDialog
        isDeleteConfirm={isDeleteConfirm}
        setIsDeleteConfirm={setIsDeleteConfirm}
        handleDeleteSummary={handleDeleteSummary}
        deleteLoading={deleteLoading}
      />
    </>
  );
};

export default SummaryCrd;
