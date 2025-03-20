import ResetPassword from '../components/reset-password';
import BgImg from '../../../assets/background.svg';
import { useTheme } from '@/modules/core/contexts/theme-provider';
const ResetPasswordPage = () => {
   const {theme} = useTheme();  
  return (
    <div
      className='min-h-[90vh] flex sm:justify-end  lg:justify-end justify-center items-center'
      style={{
        backgroundImage: `${theme === 'light' ? '' : `url(${BgImg})`}`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='sm:w-[35%] lg:w-[35%] w-[100%] px-4 0 pb-20'>
        <ResetPassword />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
