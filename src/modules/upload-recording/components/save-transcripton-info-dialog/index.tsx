import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/shadcn/components/ui/dialog';
import { useTranslations } from 'use-intl';



interface SaveSTranscriptionInfoDialogProps {
  isSaveDialogOpen: boolean;
  setIsSaveDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SaveSTranscriptionInfoDialog = ({
    isSaveDialogOpen,
    setIsSaveDialogOpen,
}: SaveSTranscriptionInfoDialogProps) => {
  const t = useTranslations();
  return (
    <div>
      <Dialog
        open={isSaveDialogOpen}
        onOpenChange={setIsSaveDialogOpen}
      >
        <DialogContent className='sm:max-w-[425px]'>
          <DialogTitle></DialogTitle>
          <DialogHeader className='flex items-center justify-center'>
            <DialogDescription className='text-md font-semibold text-center'>
              {t('transcription.generate_transcription_dialog')}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SaveSTranscriptionInfoDialog;
