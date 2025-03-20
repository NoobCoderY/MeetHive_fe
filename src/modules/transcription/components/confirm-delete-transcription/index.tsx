import { DialogHeader} from '@/shadcn/components/ui/dialog';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@shadcn/components/ui/dialog';
import React from 'react';
import { Button } from '@/shadcn/components/ui/button';
import { useTranslations } from 'use-intl';

const ConfrimDeleteDailog = ({
  confirmDeleteDailog,
  setConfirmDeleteDailog,
  deleteTranscriptionHandle,
}: {
  confirmDeleteDailog: boolean;
  setConfirmDeleteDailog: React.Dispatch<React.SetStateAction<boolean>>;
  deleteTranscriptionHandle: () => void;
  }) => {
  const t=useTranslations()
  return (
    <Dialog
      open={confirmDeleteDailog}
      onOpenChange={setConfirmDeleteDailog}
    >
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{t('transcription.delete')}</DialogTitle>
          <DialogDescription className='font-bold text-[0.8rem]'>
            {t('transcription.delete_confirm_alert_message')}
          </DialogDescription>
        </DialogHeader>
        <div className='flex items-center justify-end gap-4 mt-1'>
          <Button
            size='sm'
            className='px-4 py-4 text-[0.9rem]'
            onClick={() => setConfirmDeleteDailog(false)}
          >
            {t('transcription.delete_confirm_alert_cancel_button')}
          </Button>

          <Button
            variant='destructive'
            size='sm'
            className='p-4 text-[0.9rem]'
            onClick={deleteTranscriptionHandle}
          >
            {t('transcription.delete_confirm_alert_confirm_button')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfrimDeleteDailog;
