import { AlertDialogHeader } from '@/shadcn/components/ui/alert-dialog';
import { Button } from '@/shadcn/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/shadcn/components/ui/dialog';
import { ReloadIcon } from '@radix-ui/react-icons';
import React from 'react';
import { useTranslations } from 'use-intl';

interface DeleteSummaryDialogProps {
  isDeleteConfirm: boolean;
  setIsDeleteConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteSummary: () => Promise<void>;
  deleteLoading: boolean;
}
const DeleteSummaryDialog = ({
  isDeleteConfirm,
  setIsDeleteConfirm,
  handleDeleteSummary,
  deleteLoading,
}: DeleteSummaryDialogProps) => {
  const t = useTranslations();
  return (
    <div>
      <Dialog
        open={isDeleteConfirm}
        onOpenChange={setIsDeleteConfirm}
      >
        <DialogContent className='z-[100]'>
          <AlertDialogHeader>
            <DialogTitle className='text-[12px] sm:text-sm md:text-sm lg:text-md'>
              {t('transcription.delete_confirm_summary.title')}
            </DialogTitle>
            <DialogDescription className='text-[10px] sm:text-sm md:text-sm lg:text-md'>
              {t('transcription.delete_confirm_summary.description')}
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
                onClick={handleDeleteSummary}
                variant={'destructive'}
                className=''
              >
                {deleteLoading && (
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

export default DeleteSummaryDialog;
