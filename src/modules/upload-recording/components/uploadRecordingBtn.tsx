import { UploadCloudIcon } from 'lucide-react';
import React from 'react';
import useResponsive from '@/hooks/useResponsive';

interface UploadRecordingBtnProps {
  setIsDialogOpen: (value: React.SetStateAction<boolean | undefined>) => void;
  isSidebar?: boolean
}

const UploadRecordingBtn = ({ setIsDialogOpen,isSidebar }: UploadRecordingBtnProps) => {
  const breakPoints=useResponsive([600,900,1400])

  return (
    <div>
      {breakPoints == 0 ? (
        <>
          <span onClick={() => setIsDialogOpen(true)}>
            <UploadCloudIcon size={16} />
          </span>
        </>
      ) : (
        <>
          {isSidebar ? (
            <div onClick={() => setIsDialogOpen(true)} className='flex gap-2 items-center'>
              <UploadCloudIcon size={15} />
              Upload Recording
            </div>
          ) : (
            <UploadCloudIcon
              size={15}
              onClick={() => setIsDialogOpen(true)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default UploadRecordingBtn;
