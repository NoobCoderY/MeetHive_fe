import React, { useState } from 'react';
import UploadRecordingBtn from '../components/uploadRecordingBtn';
import UploadRecordingDialog from '../components/uploadRecordingDialog';

interface UploadRecordingProps {
  isSidebar?: boolean;
}

const UploadRecording = ({isSidebar}:UploadRecordingProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>();
  return (
    <>
      <UploadRecordingBtn isSidebar={isSidebar} setIsDialogOpen={setIsDialogOpen} />
      <UploadRecordingDialog
        setIsDialogOpen={setIsDialogOpen}
        isDialogOpen={isDialogOpen}
      />
    </>
  );
};

export default UploadRecording;
