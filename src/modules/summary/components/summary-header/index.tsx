import JAButton from '@/shadcn/atoms/ja-button';
import { Input } from '@/shadcn/components/ui/input';
import { Download, PencilLine, SaveIcon } from 'lucide-react';
import  { useEffect, useState } from 'react';
import { useTranslations } from 'use-intl';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useUpdateSummaryMutation } from '../../services/summary';
import { useToast } from '@/shadcn/components/ui/use-toast';
import { PDFDownloadLink } from '@react-pdf/renderer';
import DownlaodPdf from '../download-pdf';



const getCurrentLocale = () => {
  return localStorage.getItem('locale') || 'en';
};
const SummaryHeader = () => {
  const selectedSummary = useSelector(
    (state: RootState) => state.summary.selectedSummary
  );

  const [updateSummary] =useUpdateSummaryMutation();
  const [editTitle, setEditTitle] = useState<boolean>(true);
  const [editMeetingTitle, setEditMeetingTitle] =
    useState<string>('< Meeting Title >');
  const t = useTranslations();
  const { toast } = useToast();

  useEffect(() => {
    setEditMeetingTitle(selectedSummary?.title);
  }, [selectedSummary]);

  const saveEditedMeetingTitle = async () => {
    try {
      await updateSummary({
        title: editMeetingTitle,
        summaryId: selectedSummary?.id,
        summary: selectedSummary?.summary,
        isEditable: selectedSummary?.is_editable,
      });
      toast({
        title: 'Success',
        description: t('transcription.summary_card_title_update'),
        variant: 'default',
      });
    } catch (error) {
       toast({
         title: 'Error',
         description:
           error?.data?.error || t('transcription.summary_crud_warning'),
         variant: 'destructive',
       });  
    }
  };



  return (
    <div>
      <div className='flex justify-between items-center mt-4 relative '>
        <div className='flex gap-2 items-center !w-fit'>
          <Input
            type='text'
            value={editMeetingTitle}
            className='font-semibold text-2xl !ring-transparent !border-0  !p-0 '
            readOnly={editTitle}
            onChange={(e) => setEditMeetingTitle(e.target.value)}
          />
          {editTitle === false ? (
            <span
              className='cursor-pointer'
              onClick={() => {
                setEditTitle(true);
                saveEditedMeetingTitle();
              }}
            >
              <SaveIcon
                size={20}
                color='#97ec97'
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
          <div className='absolute left-[22%] top-[180%] z-10 text-3xl font-semibold tracking-wider'>
            {t('transcription.todos')}
          </div>
          <div
            className={`absolute  text-2xl font-semibold text-center ${
              getCurrentLocale() === 'de' ? 'left-[64%]' : 'left-[70%]'
            }  top-[150%]`}
          >
            {t('transcription.summary')}
          </div>
        </div>
        <div>
          <PDFDownloadLink
            document={<DownlaodPdf summary={selectedSummary} locale={getCurrentLocale()} />}
            fileName={`${selectedSummary?.title}.pdf`}
          >

          <JAButton
            variant='outline'
            className='w-[12rem]'
          >
            <Download size={20} />
            <span> {t('transcription.downlaod_pdf')}</span>
          </JAButton>
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
};

export default SummaryHeader;
