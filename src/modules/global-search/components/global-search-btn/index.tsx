import useResponsive from '@/hooks/useResponsive';
import { Search } from 'lucide-react';
import React from 'react'


interface IGlobalSearchBtnProps {
  setGlobalSearchDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlobalSearchBtn = ({ setGlobalSearchDialogOpen }: IGlobalSearchBtnProps) => {
  const breakPoints = useResponsive([600, 900, 1400]);
  
    const openGlobalSearchDialog = () => {
      setGlobalSearchDialogOpen((open) => !open);
    };
  return (
    <>
      {breakPoints == 0 ? (
        <div
          className='feed_back_floating_button_outer transform -rotate-90'
          onClick={openGlobalSearchDialog}
        >
          <div className='feedback_floating_button_inner'>
            <Search size={17} />
          </div>
        </div>
      ) : (
        <span className='cursor-pointer' onClick={openGlobalSearchDialog}>
          <Search  size={20}/>
        </span>
      )}
    </>
  );
}

export default GlobalSearchBtn