import  { useCallback, useEffect, useState } from 'react';
import MTodoCard from '../todo-card';
import MSummaryCard from '../summary-card';
import { Button } from '@/shadcn/components/ui/button';
import JAButton from '@/shadcn/atoms/ja-button';
import { Download, PencilLine, SaveIcon } from 'lucide-react';
import { Input } from '@/shadcn/components/ui/input';
import { useTranslations } from 'use-intl';
import { useLocale } from '@/modules/core/contexts/locale.context';
import DeleteSummaryDialog from '../../delete-summary-dailog';
import SaveSummaryDialog from '../../save-summary-warning-dialog';
import { LoadingSpinner } from '@/shadcn/components/shared/loader';
import { selectedSummary } from '@/modules/summary/slice/summary';
import { useDeleteSummaryMutation, useSummaryByIdQuery } from '@/modules/summary/services/summary';
import { useToast } from '@/shadcn/components/ui/use-toast';
import { useParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useUpdateSummaryMutation } from '@/modules/summary/services/summary';
import { useNavigate } from 'react-router-dom';
import { ReloadIcon } from '@radix-ui/react-icons';
import DownlaodPdf from '../../download-pdf';
import { PDFDownloadLink } from '@react-pdf/renderer';

const getCurrentLocale = () => {
  return localStorage.getItem('locale') || 'en';
};

const MSummary = () => {
  const { locale } = useLocale();
    const { summaryId } = useParams();
  const { toast } = useToast();
  const navigate=useNavigate()
    const dispatch = useDispatch();
  const [editTitle, setEditTitle] = useState<boolean>(true);
  const [editMeetingTitle, setEditMeetingTitle] =
    useState<string>('< Meeting Title >');
  const [isSaveConfirm, setIsSaveConfirm] = useState<boolean>(false);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState<boolean>(false);
  const [saveSummaryLoading] = useState<boolean>(false);
  const t = useTranslations();


  
  const { data, isLoading, isError, refetch: refetchSummaryById,error } = useSummaryByIdQuery({ summaryId: summaryId || '' });
    const [updateSummary,{isLoading:updateLoading}] = useUpdateSummaryMutation()
    const [deleteSummary, { isLoading: deleteLoading }] =useDeleteSummaryMutation();
  const selectSummary= useSelector((state:RootState)=>state.summary.selectedSummary);

    useEffect(() => {
      if (isError) {
       toast({
         title: 'Error',
         description:
           error?.data?.error || t('transcription.summary_crud_warning'),
         variant: 'destructive',
       });
      }
    }, [isError]);

    useEffect(() => {
      if (data) {
        dispatch(selectedSummary(data?.data));
      }
    }, [data]);

    useEffect(() => {
      refetchSummaryById();
    }, []);
  
    useEffect(() => {
      setEditMeetingTitle(selectSummary?.title);
    }, [selectSummary]);
  
    const saveEditedMeetingTitle = async () => {
      try {
        await updateSummary({
          title: editMeetingTitle,
          summaryId: selectSummary?.id,
          summary: selectSummary?.summary,
          isEditable: selectSummary?.is_editable,
        }).unwrap();
      } catch (error) {
        toast({
          title: 'Error',
          description:
            error?.data?.error || t('transcription.summary_crud_warning'),
          variant: 'destructive',
        });
       
      }
    };

  
  
   const saveSummary = async () => {
     try {
       await updateSummary({
         title: selectSummary?.title,
         summaryId: selectSummary?.id,
         summary: selectSummary?.summary,
         isEditable: false,
       }).unwrap();
       refetchSummaryById();
       setIsSaveConfirm(false);
     } catch (error) {
       toast({
         title: 'Error',
         description:error?.data?.error || t('transcription.summary_crud_warning'),
         variant: 'destructive',
       });
     }
   };

   const handleDeleteSummary = useCallback(async () => {
     try {
       await deleteSummary({
         summaryId: summaryId,
       }).unwrap();
       setIsDeleteConfirm(false);
       dispatch(selectedSummary(null));
       navigate('/summary/list');
     } catch (error) {
       toast({
         title: 'Error',
         description: error?.data?.error || t('transcription.summary_crud_warning'),
         variant: 'destructive',
       });
     }
   }, []);
  
    if (!isLoading) {
      return (
        <div className='flex justify-center items-center h-[60vh]'>
          <LoadingSpinner
          />
        </div>
      );
    }
  


  return (
    <div className='flex flex-col gap-4 mt-4'>
      <div className='flex gap-2 items-center justify-between px-4'>
        <Input
          type='text'
          value={editMeetingTitle}
          className='font-semibold text-md !ring-transparent !border-0  !p-0 '
          readOnly={editTitle}
          onChange={(e) => setEditMeetingTitle(e.target.value)}
        />
        {editTitle === false ? (
          <span className='cursor-pointer'>
            <SaveIcon
              size={20}
              color='#97ec97'
              onClick={() => {
                setEditTitle(true);
                saveEditedMeetingTitle();
              }}
            />
          </span>
        ) : (
          <span
            className='cursor-pointer'
            onClick={() => {
              setEditTitle((prev) => !prev);
            }}
          >
            <PencilLine
              size={20}
              color='#97ec97'
            />
          </span>
        )}
      </div>
      <div className='flex justify-center items-center'>
        <div>
          <PDFDownloadLink
            document={
              <DownlaodPdf
                summary={selectSummary}
                locale={getCurrentLocale()}
              />
            }
            fileName={`${selectSummary?.title}.pdf`}
          >
            <JAButton variant='outline'>
              <Download size={20} />
              <span> {t('transcription.downlaod_pdf')}</span>
            </JAButton>
          </PDFDownloadLink>
        </div>
      </div>
      <div className='mt-4'>
        <MTodoCard />
      </div>
      <div className='mt-4'>
        <MSummaryCard refetchSummaryById={refetchSummaryById} />
      </div>
      <div className='flex justify-center flex-col items-center gap-4 mt-4  relative '>
        <div className='ja-2-btn-container'>
          <Button
            className={`${
              locale == 'de' ? 'w-[15rem]' : 'w-[10rem]'
            } ja-2-button text-[#fff] `}
            onClick={() => setIsDeleteConfirm(true)}
          >
            {t('transcription.delete_summary')}
            {deleteLoading && <ReloadIcon className=' h-4 w-4 animate-spin' />}
          </Button>
        </div>
        <div>
          <JAButton
            variant='outline'
            className={`${
              locale == 'de' ? 'w-[15rem]' : 'w-[10rem]'
            } Ja-button-save-summary text-[#fff] `}
            onClick={() => setIsSaveConfirm(true)}
            disabled={!selectSummary?.is_editable}
          >
            {updateLoading && <ReloadIcon className=' h-4 w-4 animate-spin' />}
            {t('transcription.save_summary')}
          </JAButton>
        </div>
      </div>
      <SaveSummaryDialog
        isSaveConfirm={isSaveConfirm}
        setIsSaveConfirm={setIsSaveConfirm}
        saveSummary={saveSummary}
        saveLoading={saveSummaryLoading}
      />
      <DeleteSummaryDialog
        isDeleteConfirm={isDeleteConfirm}
        setIsDeleteConfirm={setIsDeleteConfirm}
        handleDeleteSummary={handleDeleteSummary}
        deleteLoading={saveSummaryLoading}
      />
    </div>
  );
};

export default MSummary;
