import Background from '../../../assets/background.svg';
import VerifyEmail from '../components/verify-email';
import { useTheme } from '@/modules/core/contexts/theme-provider';

const VerifyEmailPage = () => {
  const {theme}=useTheme()
  return (
    <div
      className='grid  min-h-[90vh] '
      style={{
        backgroundImage: `${theme === 'light' ? '' : `url(${Background})`}`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className=''>
        <VerifyEmail />
      </div>
    </div>
  );
};

export default VerifyEmailPage;
