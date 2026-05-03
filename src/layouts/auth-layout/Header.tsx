import { ModeToggle } from '@/modules/core/components/mode-switch';
import { LanguageToggle } from '@/modules/core/components/language-switch';
import Logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl'>
      <div className='mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-4 py-3 sm:px-6'>
        <Link
          to='/login'
          className='flex items-center gap-2 transition-opacity hover:opacity-90'
        >
          <div className='flex h-9 w-9 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 shadow-glow-sm'>
            <img
              src={Logo}
              alt='MeetHive'
              className='h-6 w-6 object-contain'
            />
          </div>
          <span className='hidden font-semibold tracking-tight text-foreground sm:inline'>
            MeetHive
          </span>
        </Link>
        <div className='flex items-center gap-2'>
          <ModeToggle />
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
