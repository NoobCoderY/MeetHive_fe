import { UploadCloudIcon } from 'lucide-react';
import React from 'react';
import useResponsive from '@/hooks/useResponsive';
import { Button } from '@/shadcn/components/ui/button';

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
            <Button
              type='button'
              variant='ghost'
              className='h-11 w-full justify-start gap-3 rounded-xl px-3 font-medium text-muted-foreground hover:bg-accent hover:text-foreground'
              onClick={() => setIsDialogOpen(true)}
            >
              <UploadCloudIcon size={18} />
              <span className='text-sm'>Upload Recording</span>
            </Button>
          ) : (
            <Button
              type='button'
              variant='ghost'
              size='icon'
              className='h-11 w-11 rounded-xl text-muted-foreground hover:bg-accent hover:text-foreground'
              onClick={() => setIsDialogOpen(true)}
              aria-label='Upload recording'
            >
              <UploadCloudIcon size={18} />
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default UploadRecordingBtn;
