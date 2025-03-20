import { ModeToggle } from '@/modules/core/components/mode-switch';
import { LanguageToggle } from '@/modules/core/components/language-switch';
import Logo from '../../assets/logo.svg';

const Header = () => {
  return (
    <>
      <div className='flex justify-between items-center gap-2 mb-1 p-3'>
        <div className='w-[7%] sm:w-[3%] cursor-pointer'>
          <img
            src={Logo}
            alt='Logo'
            className='w-[100%] h-[100%]'
          />
        </div>
        <div
          className={`flex justify-start items-center gap-2 flex-wrap
            `}
        >
          &nbsp;
          <ModeToggle />
          &nbsp;
          <LanguageToggle />
          &nbsp;
        </div>
      </div>
    </>
  );
};

export default Header;
