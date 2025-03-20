import SideBar from './SideBar';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import useResponsive from '@/hooks/useResponsive';
import FloatingButtons from './floating-buttons';

const UserLayout = () => {
  const breakPoints = useResponsive([600, 900, 1400]);
  return (
    <div className='min-h-screen'>
      <div className='flex justify-start items-between'>
        <div className='mt-[-1px]'>{breakPoints > 0 && <SideBar />}</div>
        <div className='py-1  w-full'>
          <Header />
          <Outlet />
        </div>
      </div>
      {breakPoints==0 &&(<FloatingButtons/>)}
    </div>
  );
};

export default UserLayout;
