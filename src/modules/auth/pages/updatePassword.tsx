import BgImg from '../../../assets/background.svg';
import UpdatePasswordForm from '../components/update-password';
import { useTheme } from '@/modules/core/contexts/theme-provider';

const UpdatePassword = () => {
  const { theme } = useTheme();

  return (
    <div
      className='min-h-[90vh] flex sm:justify-end  lg:justify-end justify-center items-center'
      style={{
        backgroundImage: `${theme === 'light' ? '' : `url(${BgImg})`}`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='sm:w-[35%] lg:w-[35%] w-[100%] px-4   pb-20'>
        <UpdatePasswordForm />
      </div>
    </div>
  );
};

export default UpdatePassword;
