import Header from './Header';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className='min-h-screen'>
      <div className='flex justify-start items-between gap-2'>
        <div className='w-full'>
          <Header />
         <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
