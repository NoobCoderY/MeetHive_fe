import ForgotPasswordEmailForm from "../components/forgot-password-email-form";
import BgImg from '../../../assets/background.svg'
import { useTheme } from "@/modules/core/contexts/theme-provider";
const ForgotPasswordEmailPage = () => {
  const {theme}=useTheme()
 
  return (
    <div
      className='min-h-[90vh] flex sm:justify-end  lg:justify-end justify-center items-center'
      style={{
        backgroundImage: `${theme === 'light' ? '' : `url(${BgImg})`}`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='sm:w-[35%] lg:w-[35%] w-[100%] px-4  pb-20'>
        <ForgotPasswordEmailForm />
      </div>
    </div>
  );
}

export default ForgotPasswordEmailPage;
