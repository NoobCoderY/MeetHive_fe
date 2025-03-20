import { AlertDialogHeader } from '@/shadcn/components/ui/alert-dialog';
import { Button } from '@/shadcn/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/shadcn/components/ui/dialog';
import { Input } from '@/shadcn/components/ui/input';
import { ReloadIcon } from '@radix-ui/react-icons';
import React from 'react';
import { useTranslations } from 'use-intl'


interface DeleteSummaryDialogProps {
  isDeleteConfirm: boolean;
  setIsDeleteConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteAccount: () => Promise<{
    id: string;
  }>;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputValue: string;
  isDeleteLoading: boolean;
}


const DeleteAccount = ({
  isDeleteConfirm,
  setIsDeleteConfirm,
  handleDeleteAccount,
  setInputValue,
  inputValue,
  isDeleteLoading
}: DeleteSummaryDialogProps) => {
  const t = useTranslations();
  return (
    <div>
      <Dialog
        open={isDeleteConfirm}
        onOpenChange={setIsDeleteConfirm}
      >
        <DialogContent className='z-[100] max-w-[450px]'>
          <AlertDialogHeader>
            <DialogTitle className='text-[12px] sm:text-sm md:text-md lg:text-lg'>
              {t('header.delete_profile')}
            </DialogTitle>
            <hr />
            <DialogDescription className='!text-[13px] font-semibold sm:text-sm md:text-sm lg:text-md'>
              {t('header.delete_account_warning')}
            </DialogDescription>
            <div className='!mt-[1rem]'>
              <h2 className='text-[9px] text-muted-foreground'>
                {t('header.delete_account_lable')}
              </h2>
              <div className='flex items-center mt-2 justify-between'>
                <Input
                  type='text'
                  className='w-[63%]'
                  placeholder={t('header.delete_profile')}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />

                <Button
                  className='ml-2'
                  variant={'destructive'}
                  onClick={handleDeleteAccount}
                >
                  {
                    isDeleteLoading ? (
                      <ReloadIcon className='animate-spin' />
                    ) : null
                  }
                  {t('header.delete_profile')}
                </Button>
              </div>
            </div>
          </AlertDialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteAccount;
