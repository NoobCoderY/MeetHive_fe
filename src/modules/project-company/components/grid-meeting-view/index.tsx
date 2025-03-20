import MeetingCard from './meeting-card';
import { useState } from 'react';
import UpdateMeeting from '../update-meeting-dialog';

const dummyArray = Array.from({ length: 10 }, (_, index) => index);

const MeetingGridView = () => {
  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

  return (
    <>
      <div className='flex  flex-wrap gap-10 sm:justify-between justify-center items-center'>
        {dummyArray.map((item) => (
          <MeetingCard
            key={`item ${item}`}
            Transcription={item}
            setUpdateMeetingDialogOpen={setUpdateMeetingDialogOpen}
          />
        ))}
      </div>
      <UpdateMeeting
        updateMeetingDialogOpen={updateMeetingDialogOpen}
        setUpdateMeetingDialogOpen={setUpdateMeetingDialogOpen}
      />
    </>
  );
};

export default MeetingGridView;
