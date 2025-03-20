import { Button } from '@/shadcn/components/ui/button';
import {
  HelpCircleIcon,
  HomeIcon,
  LayoutDashboard,
  Presentation,
} from 'lucide-react';
import Logo from '../../assets/logo.svg';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import UploadRecording from '@/modules/upload-recording/pages/uploadRecording';
import { ArrowRightFromLine } from 'lucide-react';
import { useState } from 'react';
const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuExpand, setMenuExpand] = useState(false);

  const sidenavList = [
    {
      icon: <HomeIcon size={15} />,
      selected: location.pathname.startsWith(`/dashboard`),
      href: '/dashboard',
      label: 'Dashboard',
    },
    {
      icon: <LayoutDashboard size={15} />,
      selected: location.pathname.startsWith('/transcription'),
      href: '/transcription',
      label: 'Transcription',
    },
    {
      icon: <Presentation size={15} />,
      selected: location.pathname.startsWith('/summary'),
      href: '/summary/list',
      label: 'Summary',
    },
    // {
    //   icon: <Shield />,
    // },
    {
      icon: <UploadRecording  isSidebar={menuExpand}/>,
    },
    {
      icon: <HelpCircleIcon size={15} />,
      href: '/support',
      selected: location.pathname.startsWith('/support'),
      label: 'Support',
    },
  ];

  const goToPage = (nav: any, index: any) => {
    if (index === 3) {
      return;
    }
    navigate(nav.href);
  };
  const goToHomePage = () => {
    navigate('/dashboard');
  };

  return (
    <div
      className={`border-2 h-[100vh] p-2 flex flex-col transition-all duration-300 ${
        menuExpand ? 'w-[200px]' : 'w-[70px] items-center'
      }`}
    >
      <div
        className={`cursor-pointer ${menuExpand ? 'w-[50px] pl-3 ' : 'w-[20px]'}`}
        onClick={goToHomePage}
      >
        <img
          src={Logo}
          alt='logo'
          className='w-[100%] h-[100%]'
        />
      </div>
      <div className={`mt-5 cursor-pointer ${menuExpand ? 'p-2 ' : 'p-0'}`}>
        <Button
          variant={menuExpand ? 'secondary' : 'ghost'}
          onClick={() => setMenuExpand(!menuExpand)}
        >
          <ArrowRightFromLine size={15} />
        </Button>
      </div>
      <div className='flex flex-col justify-center  h-[80vh]'>
        {sidenavList.map((nav, ind) => (
          <div
            className='p-2  overflow-hidden'
            key={`nav-${ind}`}
            onClick={() => goToPage(nav, ind)}
          >
            <Button
              className='gap-2 text-sm '
              variant={nav.selected ? 'secondary' : 'ghost'}
            >
              {nav.icon} {menuExpand && nav?.label}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
