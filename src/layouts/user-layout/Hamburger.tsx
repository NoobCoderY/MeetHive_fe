import { Sheet, SheetClose, SheetContent, SheetFooter, SheetTrigger } from '@/shadcn/components/ui/sheet';
import Logo from '../../assets/logo.svg';
import { Menu } from 'lucide-react';
import MHeader from './mobile-version/MHeader';

const Hamburger = () => {
    const SHEET_SIDES = ['top'] as const;
  return (
    <div className=''>
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Menu />
          </SheetTrigger>
          <SheetContent side={side}>
            <div
              className='relative top-[-0.8rem] cursor-pointer'
              onClick={() => {
                // redirectToDashboard();
              }}
            >
              <div className='w-[30px] h-[30px]'>
                <img
                  src={Logo}
                  alt='logo'
                  className='w-[100%] h-[100%]'
                />
              </div>
            </div>
            <div className='flex items-center justify-center px-3'>
              <MHeader />
            </div>
            <SheetFooter>
              <SheetClose asChild></SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}

export default Hamburger;
