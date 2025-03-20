import { Button } from '@/shadcn/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shadcn/components/ui/dialog';
import { Input } from '@/shadcn/components/ui/input';
import { Label } from '@/shadcn/components/ui/label';
import { RootState } from '@/store/store';
import { ReloadIcon } from '@radix-ui/react-icons';
import React, { ChangeEvent, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useTranslations } from 'use-intl';
import { useUpdateTranscriptionMutation } from '../../sevices/transcription';
import { useToast } from '@/shadcn/components/ui/use-toast';
import { useDispatch } from 'react-redux';
import { selectedTranscription as selectedTranscriptionAction } from '../../slice/transcriptionSlice';

interface IUpdatePTranscriptionDialog {
  updateTranscriptiontDialogOpen: boolean;
  setUpdateTranscriptiontDialogOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const UpdateTranscription = ({
  updateTranscriptiontDialogOpen,
  setUpdateTranscriptiontDialogOpen,
}: IUpdatePTranscriptionDialog) => {
  const { selectedTranscription } = useSelector(
    (state: RootState) => state.transcription
  );
  const t = useTranslations();
  const { toast } = useToast();
  const dispatch=useDispatch()
  const [formState, setFormState] = React.useState({
    transcriptionName:  '',
    transcriptionDescription: '',
  });

  useEffect(() => {
    setFormState({
      transcriptionName: selectedTranscription?.title || '',
      transcriptionDescription: selectedTranscription?.description || '',
    });
  }, [selectedTranscription]);

  const [updateTranscription, { isLoading }] =
    useUpdateTranscriptionMutation();
  
  const submitForm = async () => {
    try {
      const data = await updateTranscription({
        name: formState.transcriptionName,
        description: formState.transcriptionDescription,
        transcriptionId: selectedTranscription?.id,
        text: selectedTranscription?.text,
      }).unwrap();
      toast({
        title: 'Success',
        description: t('transcription.update_success'),
      });
      dispatch(selectedTranscriptionAction(data?.data));
      handleDialogClose();

    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: t('transcription.update_failed'),
      });
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleDialogClose = () => {
    setUpdateTranscriptiontDialogOpen((prev) => !prev);
  };

  

  return (
    <Dialog
      open={updateTranscriptiontDialogOpen}
      onOpenChange={handleDialogClose}
    >
      <DialogHeader>
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <DialogContent className='sm:max-w-[425px]'>
        <div className='flex justify-center items-center flex-col'>
          <div className='text-2xl relative'>
            {t('transcription.update')}
            <div className='absolute bottom-[-0.25rem] left-0 w-full h-[1px] bg-[#fff]'></div>
          </div>
          <div className='w-[100%] mt-3'>
            <div className='flex flex-col gap-2'>
              <Label
                htmlFor='transcriptionName'
                className='ml-2 text-md'
              >
                {t('transcription.transcription_name')}
              </Label>
              <Input
                id='transcriptionName'
                className='col-span-3'
                value={formState.transcriptionName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className='mt-3 flex justify-end w-[100%]'>
            <Button
              className='mr-2'
              onClick={() => submitForm()}
            >
              {isLoading && (
                <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
              )}
              {t('transcription.update')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTranscription;
