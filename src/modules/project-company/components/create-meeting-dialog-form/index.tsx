import { ChangeEvent, useState } from 'react';
import { useTranslations } from 'use-intl';
import { useToast } from '@/shadcn/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shadcn/components/ui/dialog';
import { Input } from '@/shadcn/components/ui/input';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Label } from '@radix-ui/react-label';
import { Button } from '@/shadcn/components/ui/button';

export function CreateMeetingDialog({
  setCreateMeetingtDialogOpen,
  createMeetingDialogOpen,
}: {
  createMeetingDialogOpen: boolean;
  setCreateMeetingtDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { toast } = useToast();

  const t = useTranslations();
  const [formState, setFormState] = useState({
    meetingName: '',
  });

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
    if (!formState.meetingName) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: t('meeting.meeting_name_des_required'),
      });
      return;
    }
  };


  const handleDialogClose = () => {
    setCreateMeetingtDialogOpen((prev) => !prev);
  };

  return (
    <Dialog
      open={createMeetingDialogOpen}
      onOpenChange={handleDialogClose}
    >
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader className='flex items-center justify-center'>
          <DialogTitle className='text-2xl relative'>
            {t('meeting.meeting_create')}
            <div className='absolute bottom-[-0.25rem] left-0 w-full h-[1px] bg-[#fff]'></div>
          </DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='flex flex-col gap-2'>
            <Label
              htmlFor='projectName'
              className='ml-2 text-md'
            >
              {t('project.project_name')}
            </Label>
            <Input
              id='projectName'
              defaultValue='Pedro Duarte'
              className='col-span-3'
              value={formState.meetingName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type='submit'
            onClick={submitForm}
          >
             <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
            {t('meeting.add_meeting')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
