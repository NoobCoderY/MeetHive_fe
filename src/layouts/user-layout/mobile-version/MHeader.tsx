import {
  Home,
  LayoutDashboard,
  Presentation,
  type LucideIcon,
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslations } from 'use-intl';
import FeedbackDialogPage from '@/modules/feedback/pages/feedbackDialogPage';
import { Button } from '@/shadcn/components/ui/button';
import { cn } from '@/shadcn/lib/utils';

const MHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const t = useTranslations();

  const sidenavList: (
    | { type: 'link'; icon: LucideIcon; href: string; selected: boolean; name: string }
    | { type: 'custom' }
  )[] = [
    {
      type: 'link',
      icon: Home,
      href: '/dashboard',
      selected: location.pathname.startsWith(`/dashboard`) || location.pathname === '/',
      name: 'Home',
    },
    {
      type: 'link',
      icon: LayoutDashboard,
      href: '/transcription',
      selected: location.pathname.startsWith(`/transcription`),
      name: 'Transcription',
    },
    {
      type: 'link',
      icon: Presentation,
      href: '/summary/list',
      selected: location.pathname.startsWith('/summary'),
      name: 'Summary',
    },
    { type: 'custom' },
  ];

  const goToPage = (href: string) => {
    navigate(href);
  };

  return (
    <div className='flex flex-wrap items-stretch justify-center gap-1.5 py-1'>
      {sidenavList.map((nav) => {
        if (nav.type === 'custom') {
          return (
            <div
              key='feedback'
              className='flex min-w-[4.5rem] flex-col items-center justify-center'
            >
              <FeedbackDialogPage />
            </div>
          );
        }
        const Icon = nav.icon;
        return (
          <Button
            key={nav.href}
            variant='ghost'
            className={cn(
              'h-auto min-w-[4.5rem] flex-col gap-1 rounded-2xl py-2.5',
              nav.selected
                ? 'bg-primary/15 text-primary shadow-glow-sm'
                : 'text-muted-foreground'
            )}
            onClick={() => goToPage(nav.href)}
          >
            <Icon className='h-5 w-5' />
            <span className='text-[0.6rem] font-medium leading-tight'>
              {t(`sidebar.${nav.name.toLowerCase()}`)}
            </span>
          </Button>
        );
      })}
    </div>
  );
};

export default MHeader;
