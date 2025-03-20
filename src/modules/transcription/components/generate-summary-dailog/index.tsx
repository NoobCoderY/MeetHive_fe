import { Dialog, DialogContent, DialogDescription, DialogHeader } from '@/shadcn/components/ui/dialog';
import React from 'react'
import { useTranslations } from 'use-intl';
import './index.css'


interface IGenerateSummaryDialogProps {
  isDialogOpen: boolean;
}

const GenerateSummaryDialog = ({ isDialogOpen}: IGenerateSummaryDialogProps) => {

    const t = useTranslations()
  
  return (
    <Dialog
      open={isDialogOpen}
    >
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader className='flex items-center justify-center'>
          <DialogDescription className='text-md font-semibold text-center'>
            {t('transcription.generate_summary_dialog')}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default GenerateSummaryDialog