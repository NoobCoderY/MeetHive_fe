import {
  HomeIcon,
  LayoutDashboard,
  Presentation,
  // Shield,
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/shadcn/components/ui/button';
import { useTranslations } from 'use-intl';
import FeedbackDialogPage from '@/modules/feedback/pages/feedbackDialogPage';

const MHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const t = useTranslations();

  const sidenavList = [
    {
      icon: <HomeIcon />,
      href: '/dashboard',
      selected: location.pathname.startsWith(`/dashboard`),
      name: 'Home',
    },
    {
      icon: <LayoutDashboard />,
      href: '/transcription',
      selected: location.pathname.startsWith(`/transcription`),
      name: 'Transcription',
    },
    {
      icon: <Presentation />,
      href: '/summary/list',
      selected: location.pathname.startsWith('/summary'),
      name: 'Summary',
    },
    // {
    //   icon: <Shield />,
    //   href: '/subscription',
    //   selected: location.pathname.startsWith(`/subscription`),
    //   name: 'Upgrade',
    // },
    {
      icon: <FeedbackDialogPage />,
      href: '/feedback',
      selected: location.pathname.startsWith(`/feedback`),
      name: 'feedback',
    },
  ];
  const goToPage = (nav: any) => {
    navigate(`${nav.href}`);
  };
  return (
    <div className='flex'>
      {sidenavList.map((nav, ind) => (
        <div
          className='p-1 text-lg'
          key={`nav-${ind}`}
        >
          <Button
            className={` flex flex-col flex-wrap h-fit px-2`}
            variant={nav.selected ? 'link' : 'ghost'}
            onClick={() => {
              if (ind != 3) {
                goToPage(nav);
              }
            }}
          >
            {nav.icon}

            <span className='text-[0.5rem] relative top-[0px]'>
              {t(`sidebar.${nav.name.toLowerCase()}`)}
            </span>
          </Button>
        </div>
      ))}
    </div>
  );
};

export default MHeader;
