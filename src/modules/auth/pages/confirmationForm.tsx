import Background from '../../../assets/background.svg'
import ConfirmationTempalte from '../components/confirmation-template'
import { useTheme } from '@/modules/core/contexts/theme-provider';

const ConfirmationForm = () => {
  const { theme } = useTheme();
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
        <ConfirmationTempalte />
      </div>
    </div>
  );
}

export default ConfirmationForm