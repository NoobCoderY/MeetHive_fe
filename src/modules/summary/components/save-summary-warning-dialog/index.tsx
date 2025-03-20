import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/shadcn/components/ui/dialog';
import {
  AlertDialogHeader,
} from '@/shadcn/components/ui/alert-dialog';
import { useTranslations } from 'use-intl';
import { Button } from '@/shadcn/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';



interface SaveSummaryDialogProps {
  isSaveConfirm: boolean;
  setIsSaveConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  saveSummary: () => Promise<void>;
  saveLoading: boolean;
}

const SaveSummaryDialog = ({
  isSaveConfirm,
  setIsSaveConfirm,
  saveSummary,
  saveLoading,
}: SaveSummaryDialogProps) => {
  const t = useTranslations();
  return (
    <div>
      <Dialog
        open={isSaveConfirm}
        onOpenChange={setIsSaveConfirm}
      >
        <DialogContent className='z-[100]'>
          <AlertDialogHeader>
            <DialogTitle className='text-[12px] sm:text-sm md:text-sm lg:text-md'>
              {t('transcription.save_confirm.title')}
            </DialogTitle>
            <DialogDescription className='text-[10px] sm:text-sm md:text-sm lg:text-md'>
              {t('transcription.save_confirm.description')}
            </DialogDescription>
          </AlertDialogHeader>

          <div className='flex gap-4 justify-end'>
            <DialogClose>
              <Button
                variant='outline'
                className=''
              >
                {t('transcription.save_confirm.cancel_button')}
              </Button>
            </DialogClose>
            <DialogClose>
              <Button
                onClick={saveSummary}
                variant={'default'}
                className=''
              >
                {saveLoading && (
                  <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                )}
                {t('transcription.save_confirm.confirm_button')}
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SaveSummaryDialog;
