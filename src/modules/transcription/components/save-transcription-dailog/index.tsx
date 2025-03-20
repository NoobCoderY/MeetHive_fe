import { Button } from '@/shadcn/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shadcn/components/ui/dialog';
import { Input } from '@/shadcn/components/ui/input';
import { Label } from '@/shadcn/components/ui/label';
import { useToast } from '@/shadcn/components/ui/use-toast';
import { ReloadIcon } from '@radix-ui/react-icons';
import React, { ChangeEvent, useState } from 'react';
import { useTranslations } from 'use-intl';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useCreateTranscriptionMutation } from '../../sevices/transcription';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearTanscription } from '../../slice/transcriptionSlice';
import { useGetMonthlyUsageQuery } from '@/modules/core/services/restriction';
import { DialogDescription } from '@radix-ui/react-dialog';

interface ISaveTranscriptionDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SaveTranscriptionDialog = ({
  isDialogOpen,
  setIsDialogOpen,
}: ISaveTranscriptionDialogProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentTranscription = useSelector(
    (state: RootState) => state.transcription.currentTranscription
  );
  const t = useTranslations();
  const [formState, setFormState] = useState({
    transcriptionName: '',
    description: '',
  });
  const [createTranscription, { isError, isLoading, isSuccess }] = useCreateTranscriptionMutation();
  const { refetch } = useGetMonthlyUsageQuery('');

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const submitForm = () => {
    if (!formState.transcriptionName) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: t('project.project_name_des_required'),
      });
      return;
    }
    
    const transcriptionData = {
      title: formState.transcriptionName,
      description: formState.description || ' ',
      text: {content: currentTranscription.content},
      duration: currentTranscription.endTime,
    };
    createTranscription(transcriptionData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Success',
        description: t('transcription.save_success'),
      });
      refetch();
      setFormState({
        transcriptionName: '',
        description: '',
      });
      setIsDialogOpen((prev) => !prev);
      dispatch(clearTanscription());
      navigate('/transcription');
    }

    if (isError) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: t('transcription.save_failed'),
      });
    }
  }, [isError, isSuccess]);


  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open: boolean) => setIsDialogOpen(open)}
    >
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader className='flex items-center justify-center'>
          <DialogTitle className='text-2xl relative'>
            {t('transcription.transcription_create')}
            <div className='absolute bottom-[-0.25rem] left-0 w-full h-[1px] bg-[#fff]'></div>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='flex flex-col gap-2'>
            <Label
              htmlFor='projectName'
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
        <DialogFooter>
          <Button
            type='submit'
            onClick={submitForm}
          >
            {isLoading && <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />}
            {t('transcription.save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SaveTranscriptionDialog;
