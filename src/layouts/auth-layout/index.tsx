import Header from './Header';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className='flex min-h-screen flex-col app-mesh-bg'>
      <Header />
      <div className='flex min-h-0 flex-1 flex-col'>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
