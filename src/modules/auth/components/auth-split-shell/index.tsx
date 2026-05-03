import { ReactNode } from 'react';
import { Sparkles, Waves, Zap } from 'lucide-react';

type AuthSplitShellProps = {
  children: ReactNode;
  variant?: 'login' | 'signup';
};

const AuthSplitShell = ({ children, variant = 'login' }: AuthSplitShellProps) => {
  return (
    <div className='flex min-h-0 flex-1 flex-col lg:grid lg:min-h-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)]'>
      <aside className='relative hidden overflow-hidden border-r border-border/60 lg:flex lg:flex-col lg:justify-between lg:px-12 lg:py-14'>
        <div className='pointer-events-none absolute inset-0 opacity-90'>
          <div className='absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-primary/20 blur-3xl' />
          <div className='absolute bottom-0 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl' />
          <div className='absolute right-1/4 top-10 h-40 w-40 rounded-full border border-primary/30' />
        </div>

        <div className='relative z-10 space-y-6 animate-fade-up'>
          <div className='inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary'>
            <Sparkles className='h-3.5 w-3.5' />
            MeetHive
          </div>
          <h1 className='max-w-lg text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground md:text-5xl'>
            {variant === 'login'
              ? 'Your workspace for voice intelligence.'
              : 'Start building your audio workflow.'}
          </h1>
          <p className='max-w-md text-base leading-relaxed text-muted-foreground'>
            Transcribe, summarize, and ship insights with a control surface built for speed — glass
            panels, instant feedback, and a navigation model that stays out of your way.
          </p>
        </div>

        <div className='relative z-10 grid gap-4 sm:grid-cols-3'>
          {[
            { icon: Waves, label: 'Streaming audio', sub: 'Low-latency capture' },
            { icon: Zap, label: 'Fast summaries', sub: "Today's highlights" },
            { icon: Sparkles, label: 'Premium UX', sub: 'Built for focus' },
          ].map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className='glass-panel glow-ring-hover rounded-2xl p-4 transition-transform duration-300 hover:-translate-y-0.5'
            >
              <Icon className='mb-3 h-5 w-5 text-primary' />
              <p className='text-sm font-semibold text-foreground'>{label}</p>
              <p className='mt-1 text-xs text-muted-foreground'>{sub}</p>
            </div>
          ))}
        </div>
      </aside>

      <main className='relative flex min-h-0 flex-1 flex-col justify-center px-5 py-12 sm:px-10 lg:px-14'>
        <div className='pointer-events-none absolute inset-0 lg:hidden'>
          <div className='absolute right-0 top-0 h-48 w-48 rounded-full bg-primary/15 blur-3xl' />
        </div>
        <div className='relative z-10 mx-auto w-full max-w-md animate-fade-up'>{children}</div>
      </main>
    </div>
  );
};

export default AuthSplitShell;
