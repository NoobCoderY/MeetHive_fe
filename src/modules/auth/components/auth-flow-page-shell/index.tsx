import { ReactNode } from 'react';
import { cn } from '@/shadcn/lib/utils';

type AuthFlowPageShellProps = {
  children: ReactNode;
  /** Wider content for message-only screens */
  wide?: boolean;
  className?: string;
};

/**
 * Mesh background + centered content area for auth flows (confirmation, verify email, forgot password, etc.).
 */
const AuthFlowPageShell = ({
  children,
  wide,
  className,
}: AuthFlowPageShellProps) => {
  return (
    <div
      className={cn(
        'flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center app-mesh-bg px-4 py-10',
        className
      )}
    >
      <div
        className={cn('w-full', wide ? 'max-w-2xl' : 'max-w-md')}
      >
        {children}
      </div>
    </div>
  );
};

export default AuthFlowPageShell;
