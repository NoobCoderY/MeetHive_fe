import SignupForm from "../components/signup-form";
import Background from '../../../assets/background.svg'
import { useTheme } from "@/modules/core/contexts/theme-provider";


const Signup = () => {
  const {theme}=useTheme()
  return (
    <div
      className='min-h-[90vh] flex sm:justify-end  lg:justify-end justify-center items-center'
      style={{
        backgroundImage: `${theme === 'light' ? '' : `url(${Background})`}`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='sm:w-[35%] lg:w-[35%] w-[100%] px-4'>
        <SignupForm />
      </div>
    </div>
  );
}

export default Signup;
