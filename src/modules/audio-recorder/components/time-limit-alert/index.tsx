import React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
} from '@/shadcn/components/ui/alert-dialog';
import { Siren } from 'lucide-react';
import { useTranslations } from 'use-intl';

interface TimeLimitAlertProps {
  duration: number;
  alertOpen: boolean;
  setAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TimeLimitAlert = ({
  alertOpen,
  setAlertOpen,
  duration,
}: TimeLimitAlertProps) => {
  const t=useTranslations()
  return (
    <AlertDialog
      open={alertOpen}
      onOpenChange={setAlertOpen}
    >
      <AlertDialogContent>
        <div className=''>
          <div className='flex justify-center items-center flex-col gap-3'>
            <span>
              <Siren size={30} />
            </span>
            <h1 className='text-xl font-semibold'>
              {t('transcription.time_alert.title')}
            </h1>
            <p className='text-center'>
              {duration === 5
                ? `${t('transcription.time_alert.exceed_time_warning')}`
                : `${t('transcription.time_alert.exceed_time_exit')}`}
            </p>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TimeLimitAlert;
