import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shadcn/components/ui/dialog';
import React from 'react';
import { useTranslations } from 'use-intl';

const TranscriptionTitleDescriptionDialog = ({
  transcriptionTitleDescriptionDialogOpen,
  setTranscriptionTitleDescriptionDialogOpen,
  transcriptionName,
  transcriptionDetails,
}: {
  transcriptionTitleDescriptionDialogOpen: boolean;
  setTranscriptionTitleDescriptionDialogOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  transcriptionName: string;
  transcriptionDetails: string;
}) => {
  const t = useTranslations();
  return (
    <Dialog
      open={transcriptionTitleDescriptionDialogOpen}
      onOpenChange={setTranscriptionTitleDescriptionDialogOpen}
    >
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader className='flex  justify-center items-center'>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
          <div className='text-2xl relative'>
            {t('transcription.transcription_details')}
            <div className='absolute bottom-[-0.25rem] left-0 w-full h-[1px] bg-[#fff]'></div>
          </div>
        </DialogHeader>
        <div className='mt-3 flex flex-col gap-5'>
          <div className='flex items-center'>
            <div className='basis-[35%]'>
              {t('transcription.transcription_details_title')} :{' '}
            </div>
            <div className='h-[4rem] w-[100%] rounded-lg border-[1px] border-gray-700 p-2 overflow-scroll'>
              {transcriptionName}
            </div>
          </div>
          <div className='flex items-center'>
            <div className='basis-[35%]'>{t('transcription.created_by')}:</div>
            <div className='h-[4rem] w-[100%] rounded-lg border-[1px] border-gray-700 p-2 overflow-scroll'>
              {transcriptionDetails}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TranscriptionTitleDescriptionDialog;
