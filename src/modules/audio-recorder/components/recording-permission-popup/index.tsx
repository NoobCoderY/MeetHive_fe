import * as React from 'react';
import { Button } from '@/shadcn/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/shadcn/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/shadcn/components/ui/form';
import { useTranslations } from 'use-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Checkbox } from '@/shadcn/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRecordingPermission } from '@/modules/transcription/slice/transcriptionSlice';

type PopupProps = {
  showPopup: boolean;
  handlePopup: () => void;
  setIsRecordingPermission: React.Dispatch<React.SetStateAction<boolean>>;
  setAudioRecorderSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  startRecordingBtn: () => Promise<void>;
};

export default function RecordingPermissionDialog({
  showPopup,
  handlePopup,
  setIsRecordingPermission,
  setAudioRecorderSheetOpen,
  startRecordingBtn,
}: PopupProps) {
  return (
    <Dialog
      open={showPopup}
      onOpenChange={handlePopup}
    >
      <DialogContent
        className='sm:max-w-[400px] sm:!p-4 p-2'
      >
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <PopUpForm
          showPopup={showPopup}
          handlePopup={handlePopup}
          setIsRecordingPermission={setIsRecordingPermission}
          setAudioRecorderSheetOpen={setAudioRecorderSheetOpen}
          startRecordingBtn={startRecordingBtn}
        />
      </DialogContent>
    </Dialog>
  );
}

function PopUpForm({
  handlePopup,
  setIsRecordingPermission,
  setAudioRecorderSheetOpen,
  startRecordingBtn,
}: PopupProps) {
  const t = useTranslations('audio_recorder');
  const navigate = useNavigate();
  const popUpFormSchema = z.object({
    isChecked: z.boolean().default(false).optional(),
  });

  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof popUpFormSchema>>({
    resolver: zodResolver(popUpFormSchema),
    defaultValues: {
      isChecked: false,
    },
  });

  const { isChecked } = form.getValues();

  const onConfirm = async (isChecked: boolean | undefined) => {
    if (isChecked) {
      dispatch(setRecordingPermission(true));
      setIsRecordingPermission(() => {
        navigate('/transcription/live');
        startRecordingBtn();
        return true;
      });
      setAudioRecorderSheetOpen(() => {
        return true;
      });
      handlePopup();
    } else {
      dispatch(setRecordingPermission(false));
      setIsRecordingPermission(() => {
        return false;
      });
      setAudioRecorderSheetOpen(() => {
        return false;
      });
      handlePopup();
    }
  };

  const onCancel = () => {
    setAudioRecorderSheetOpen(() => {
      return false;
    });
    setIsRecordingPermission(false);
    handlePopup();
  };

  return (
    <div>
      <Form {...form}>
        <form className='space-y-6'>
          <FormField
            control={form.control}
            name='isChecked'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center sm:space-x-5 space-x-2 space-y-0 sm:p-4 p-1 shadow'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className='sm:w-6 sm:h-6'
                  />
                </FormControl>
                <div className='space-y-1 leading-none'>
                  <FormLabel className='sm:text-sm text-[0.8rem]'>
                    {t('allow_recording')}
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          <div className=' !mt-[12px] '>
            {!isChecked && (
              <p className='sm:text-sm text-[0.8rem] text-red-500'>
                {t('allow_recording_alert_message')}
              </p>
            )}
          </div>
          <div className='flex  justify-end gap-[1rem] '>
            <Button
              type='button'
              onClick={() => {
                onCancel();
              }}
              variant={'destructive'}
            >
              {t('cancel_button')}
            </Button>
            <Button
              type='button'
              onClick={() => onConfirm(isChecked)}
              disabled={!isChecked}
            >
              {t('confirm_button')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
