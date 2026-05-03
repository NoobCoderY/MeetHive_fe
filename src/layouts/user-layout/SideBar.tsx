import { Button } from '@/shadcn/components/ui/button';
import {
  HelpCircle,
  Home,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeft,
  Presentation,
  type LucideIcon,
} from 'lucide-react';
import Logo from '../../assets/logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import UploadRecording from '@/modules/upload-recording/pages/uploadRecording';
import { useState } from 'react';
import { cn } from '@/shadcn/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shadcn/components/ui/tooltip';
import { Separator } from '@/shadcn/components/ui/separator';

type NavLinkItem = {
  type: 'link';
  icon: LucideIcon;
  label: string;
  href: string;
  selected: boolean;
};

type NavUploadItem = { type: 'upload' };

type NavEntry = NavLinkItem | NavUploadItem;

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);

  const entries: NavEntry[] = [
    {
      type: 'link',
      icon: Home,
      selected:
        location.pathname.startsWith(`/dashboard`) ||
        location.pathname === '/' ||
        location.pathname === '',
      href: '/dashboard',
      label: 'Dashboard',
    },
    {
      type: 'link',
      icon: LayoutDashboard,
      selected: location.pathname.startsWith('/transcription'),
      href: '/transcription',
      label: 'Transcription',
    },
    {
      type: 'link',
      icon: Presentation,
      selected: location.pathname.startsWith('/summary'),
      href: '/summary/list',
      label: 'Summary',
    },
    { type: 'upload' },
    {
      type: 'link',
      icon: HelpCircle,
      href: '/support',
      selected: location.pathname.startsWith('/support'),
      label: 'Support',
    },
  ];

  const goToHomePage = () => {
    navigate('/dashboard');
  };

  const LinkRow = ({
    icon: Icon,
    label,
    href,
    selected,
  }: Omit<NavLinkItem, 'type'>) => {
    const button = (
      <Button
        variant='ghost'
        className={cn(
          'group relative h-11 w-full justify-start gap-3 rounded-xl px-3 font-medium transition-all duration-200',
          selected
            ? 'bg-primary/15 text-primary shadow-glow-sm'
            : 'text-muted-foreground hover:bg-accent hover:text-foreground'
        )}
        onClick={() => navigate(href)}
      >
        <Icon
          className={cn(
            'h-[18px] w-[18px] shrink-0 transition-transform duration-200 group-hover:scale-105',
            selected && 'text-primary'
          )}
        />
        {expanded && <span className='truncate text-sm'>{label}</span>}
        {selected && (
          <span className='absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary shadow-glow-sm' />
        )}
      </Button>
    );

    if (!expanded) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent
            side='right'
            className='font-medium'
          >
            {label}
          </TooltipContent>
        </Tooltip>
      );
    }

    return button;
  };

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          'sticky top-0 z-40 flex h-screen shrink-0 flex-col border-r border-border/60 bg-card/75 py-4 backdrop-blur-xl transition-[width] duration-300',
          expanded ? 'w-56 px-3' : 'w-[72px] items-center px-2'
        )}
      >
        <div
          className={cn(
            'mb-4 flex items-center',
            expanded ? 'justify-between gap-2 px-1' : 'flex-col gap-3'
          )}
        >
          <button
            type='button'
            onClick={goToHomePage}
            className={cn(
              'flex cursor-pointer items-center gap-2 rounded-xl p-1.5 transition-opacity hover:opacity-90',
              !expanded && 'justify-center'
            )}
          >
            <div className='flex h-9 w-9 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 shadow-inner-glow'>
              <img
                src={Logo}
                alt='MeetHive'
                className='h-6 w-6 object-contain'
              />
            </div>
            {expanded && (
              <span className='text-sm font-semibold tracking-tight text-foreground'>MeetHive</span>
            )}
          </button>
          <Button
            variant='outline'
            size='icon'
            className='h-9 w-9 shrink-0 rounded-xl border-border/60 bg-background/50'
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {expanded ? <PanelLeftClose className='h-4 w-4' /> : <PanelLeft className='h-4 w-4' />}
          </Button>
        </div>

        <Separator className='mb-3 bg-border/60' />

        <nav className='flex flex-1 flex-col gap-1 overflow-y-auto no-scrollbar'>
          {entries.map((entry, ind) => {
            if (entry.type === 'upload') {
              return (
                <div
                  key={`upload-${ind}`}
                  className={cn('flex w-full justify-center px-1', expanded && 'justify-start')}
                >
                  <UploadRecording isSidebar={expanded} />
                </div>
              );
            }
            return (
              <LinkRow
                key={entry.href}
                icon={entry.icon}
                label={entry.label}
                href={entry.href}
                selected={entry.selected}
              />
            );
          })}
        </nav>
      </aside>
    </TooltipProvider>
  );
};

export default SideBar;
