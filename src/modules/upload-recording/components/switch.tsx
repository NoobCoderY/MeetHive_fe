import React from 'react';
import MeetingProviders from './meetingProviders';
import { DateRange } from 'react-day-picker';
import { IMeetingProviderListType } from '../models';
import ZoomRecording from './zoomRecording';
import LocalRecordingUploader from './localRecordingUploader';
interface ISwitchComponentProps {
  selectDialogComponent: number;
  setSelectDialogComponent: React.Dispatch<React.SetStateAction<number>>;
  meetingProviderList: IMeetingProviderListType[];
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean| undefined>>;
}

const SwitchComponent = ({
  selectDialogComponent,
  setSelectDialogComponent,
  meetingProviderList,
  date,
  setDate,
  setIsDialogOpen,
}: ISwitchComponentProps) => {
  switch (selectDialogComponent) {
    case 1:
      return (
        <MeetingProviders
          setSelectDialogComponent={setSelectDialogComponent}
          meetingProviderList={meetingProviderList}
        />
      );
    case 2:
      return (
        <ZoomRecording
          setSelectDialogComponent={setSelectDialogComponent}
          date={date}
          setDate={setDate}
          setIsDialogOpen={setIsDialogOpen}
        />
      );

    case 3:
      return (
        <LocalRecordingUploader
          // setSelectDialogComponent={setSelectDialogComponent}
          setIsDialogOpen={setIsDialogOpen}
        />
      );
  }
};

export default SwitchComponent;
