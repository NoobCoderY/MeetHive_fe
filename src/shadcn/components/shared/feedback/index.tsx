import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import { cn } from '@shadcn/lib/utils';

const FeedbackDialog = DialogPrimitive.Root;

const FeedbackDialogTrigger = DialogPrimitive.Trigger;

const FeedbackDialogPortal = DialogPrimitive.Portal;

const FeedbackDialogClose = DialogPrimitive.Close;

const FeedbackDialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
));
FeedbackDialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const FeedbackDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <FeedbackDialogPortal>
    <FeedbackDialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background  shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </FeedbackDialogPortal>
));
FeedbackDialogContent.displayName = DialogPrimitive.Content.displayName;

const FeedbackDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className
    )}
    {...props}
  />
);
FeedbackDialogHeader.displayName = 'FeedbackDialogHeader';

const FeedbackDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
);
FeedbackDialogFooter.displayName = 'FeedbackDialogFooter';

const FeedbackDialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));
FeedbackDialogTitle.displayName = DialogPrimitive.Title.displayName;

const FeedbackDialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
FeedbackDialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  FeedbackDialog,
  FeedbackDialogPortal,
  FeedbackDialogOverlay,
  FeedbackDialogTrigger,
  FeedbackDialogClose,
  FeedbackDialogContent,
  FeedbackDialogHeader,
  FeedbackDialogFooter,
  FeedbackDialogTitle,
  FeedbackDialogDescription,
};
