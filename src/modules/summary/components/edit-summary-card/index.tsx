import { Card } from '@/shadcn/components/ui/card'
import { ReloadIcon } from '@radix-ui/react-icons'
import { Save, X } from 'lucide-react'
import React, { useEffect } from 'react'
import { useTranslations } from 'use-intl'
import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'
import { useUpdateSummaryMutation } from '../../services/summary'
import { BaseQueryApi, FetchArgs, QueryActionCreatorResult, QueryDefinition } from '@reduxjs/toolkit/query';
import { useToast } from '@/shadcn/components/ui/use-toast'




interface EditSummaryCardProps {
  setShowEditcard: React.Dispatch<React.SetStateAction<boolean>>;
  setEditSummaryContent: React.Dispatch<React.SetStateAction<string>>;
  editSummaryContent: string;
  refetchSummaryById: () => QueryActionCreatorResult< QueryDefinition< { summaryId: string; },(args: string | FetchArgs,api: BaseQueryApi, extraOptions: object
      ) => Promise<any>,
      'Summary' | 'Usage',
      any,
      'summmaryApi'
    >
  >;
}

const EditSummaryCard = (props:EditSummaryCardProps) => {
  const t = useTranslations()
  const{ toast} = useToast();
   const selectedSummary = useSelector(
     (state: RootState) => state.summary.selectedSummary
  );
    const [updateSummary,{isLoading}] =
      useUpdateSummaryMutation();

     useEffect(() => {
       const element = document.querySelector('.edit_summary_card') as Element;
       let timeout: NodeJS.Timeout;

       if (element != null) {
         element.classList.add('fade-in');

         timeout = setTimeout(() => {
           element.classList.remove('fade-in');
         }, 0);
       }
       return () => {
         clearTimeout(timeout);
       };
     }, []);

  const saveChange = async () => {
        try { 
           await updateSummary({
             title: selectedSummary?.title,
             summaryId: selectedSummary?.id,
             summary:props.editSummaryContent,
             isEditable: selectedSummary?.isEditable,
           }).unwrap();
           props.setShowEditcard(false);
         } catch (error) {
            toast({
              title: 'Error',
              description:
                error?.data?.error || t('transcription.summary_crud_warning'),
              variant: 'destructive',
            });
         }
        
  };
  
    const handleEditChange = (event: React.ChangeEvent<HTMLParagraphElement>) => {
      const editText = (event.target as HTMLDivElement).innerText;
      props.setEditSummaryContent(editText);
    };
  return (
    <div className='sm:p-3 md:p-4 lg:p-4  edit_summary_card  '>
      <Card className='p-4 rounded-none border-[#97ec97]   break-words text-wrap overflow-auto sm:max-h-72 lg:max-h-72 md:max-h-72 max-h-[13rem] '>
        <p
          className='text-[12px] leading-[20px]  font-extralight !border-0 !outline-none  break-words text-wrap'
          contentEditable={true}
          suppressContentEditableWarning={true}
          onInput={handleEditChange}
        >
          {selectedSummary?.summary}
        </p>
      </Card>
      <div className='flex justify-between mt-6'>
        <div
          className='text-[#ee4f4f] flex gap-2 items-center cursor-pointer'
          onClick={() => props.setShowEditcard(false)}
        >
          <span className='sm:w-[16px] lg:w-[18px] md:w-[16px] w-[14px]'>
            <X className='w-[100%]' />
          </span>
          <span className='sm:text-sm md:text-sm lg:text-sm text-[10px]'>
            {t('transcription.cancel_changes')}
          </span>
        </div>
        <div
          className={`text-[#97ec97] flex gap-2 items-center cursor-pointer`}
          onClick={() => saveChange()}
        >
          {isLoading && <ReloadIcon className=' h-4 w-4 animate-spin' />}
          <span className='sm:w-[14px] lg:w-[18px] md:w-[16px] w-[14px]'>
            <Save className='w-[100%] h-[100%]' />
          </span>
          <span className='sm:text-sm md:text-sm lg:text-sm text-[10px]'>
            {t('transcription.save_changes')}
          </span>
        </div>
      </div>
    </div>
  );}


export default EditSummaryCard