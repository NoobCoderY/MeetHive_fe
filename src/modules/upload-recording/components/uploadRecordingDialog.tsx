// import Stepper from '@/shadcn/components/shared/stepper-component';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shadcn/components/ui/dialog';
import React from 'react';
// import { DateRange } from 'react-day-picker';
// import { addDays } from 'date-fns';
// import { meetingProviderList } from '../utils';
// import Switch from './switch';
import LocalRecordingUploader from './localRecordingUploader';

interface UploadRecordingDialogProps {
  isDialogOpen: boolean | undefined;
  setIsDialogOpen: (value: React.SetStateAction<boolean | undefined>) => void;
}

const UploadRecordingDialog = ({
  isDialogOpen,
  setIsDialogOpen,
}: UploadRecordingDialogProps) => {
  // const [selectDialogComponent, setSelectDialogComponent] = useState<number>(1);
  // const [date, setDate] = React.useState<DateRange | undefined>({
  //   from: addDays(new Date(), 0),
  //   to: addDays(new Date(), 0),
  // });
  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open: boolean) => setIsDialogOpen(open)}
    >
      <DialogHeader>
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      <DialogContent className='!py-3'>
        <div>
          {/* <Stepper selectDialogComponent={selectDialogComponent} /> */}
          {/* <Switch
            selectDialogComponent={selectDialogComponent}
            setSelectDialogComponent={setSelectDialogComponent}
            meetingProviderList={meetingProviderList}
            date={date}
            setDate={setDate}
            setIsDialogOpen={setIsDialogOpen}
          /> */}
          <LocalRecordingUploader
            setIsDialogOpen={setIsDialogOpen}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadRecordingDialog;
