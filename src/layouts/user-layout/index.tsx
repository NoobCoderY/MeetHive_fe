import SideBar from './SideBar';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import useResponsive from '@/hooks/useResponsive';
import FloatingButtons from './floating-buttons';

const UserLayout = () => {
  const breakPoints = useResponsive([600, 900, 1400]);
  return (
    <div className='flex min-h-screen app-mesh-bg'>
      {breakPoints > 0 && <SideBar />}
      <div className='flex min-h-0 min-w-0 flex-1 flex-col'>
        <Header />
        <div className='flex-1 overflow-x-hidden px-4 pb-8 pt-2 md:px-8'>
          <Outlet />
        </div>
      </div>
      {breakPoints === 0 && <FloatingButtons />}
    </div>
  );
};

export default UserLayout;
