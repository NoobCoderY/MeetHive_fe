import React, { useState } from 'react';
import { useTranslations } from 'use-intl';
import { ReloadIcon } from '@radix-ui/react-icons';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { Button } from '@/shadcn/components/ui/button';
import { Textarea } from '@/shadcn/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shadcn/components/ui/dialog';
import { useCreateFeedbackMutation } from '../../services/feedback';
import { useToast } from '@/shadcn/components/ui/use-toast';

interface IFeedbackDialogProps {
  setFeedbackDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  feedbackDialogOpen: boolean;
}

const FeedbackDialog = ({
  setFeedbackDialogOpen,
  feedbackDialogOpen,
}: IFeedbackDialogProps) => {
  const t = useTranslations();
  const { toast } = useToast();
  const [createFeedback, { isLoading }] = useCreateFeedbackMutation();

  const [feedbackText, setFeedbackText] = useState('');
  /** -1 = pick reaction, 0 = liked (thank you), 1 = dislike form */
  const [step, setStep] = useState<-1 | 0 | 1>(-1);

  const closeAndReset = () => {
    setFeedbackDialogOpen(false);
    setFeedbackText('');
    setStep(-1);
  };

  const handleLike = async () => {
    try {
      await createFeedback({
        reaction: true,
        feedback: feedbackText.trim() || 'Positive feedback',
      }).unwrap();
      toast({ title: 'Success', description: t('feedback.feedback_success') });
      setStep(0);
    } catch (error: unknown) {
      const err = error as { data?: { error?: string } };
      toast({
        title: 'Error',
        description: err?.data?.error || t('dashboard.error'),
        variant: 'destructive',
      });
    }
  };

  const handleDislikeSubmit = async () => {
    try {
      await createFeedback({
        reaction: false,
        feedback: feedbackText.trim() || '—',
      }).unwrap();
      toast({ title: 'Success', description: t('feedback.feedback_success') });
      closeAndReset();
    } catch (error: unknown) {
      const err = error as { data?: { error?: string } };
      toast({
        title: 'Error',
        description: err?.data?.error || t('dashboard.error'),
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog
      open={feedbackDialogOpen}
      onOpenChange={(open) => {
        setFeedbackDialogOpen(open);
        if (!open) {
          setFeedbackText('');
          setStep(-1);
        }
      }}
    >
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{t('feedback.feedback_btn')}</DialogTitle>
          <DialogDescription>{t('feedback.feedback_description')}</DialogDescription>
        </DialogHeader>

        {step === -1 && (
          <div className='flex flex-col gap-4 pt-2'>
            <div className='flex flex-col gap-2 sm:flex-row sm:justify-center'>
              <Button
                type='button'
                className='gap-2 rounded-xl'
                onClick={handleLike}
              >
                <ThumbsUp className='h-4 w-4' />
                {t('feedback.like')}
              </Button>
              <Button
                type='button'
                variant='outline'
                className='gap-2 rounded-xl'
                onClick={() => setStep(1)}
              >
                <ThumbsDown className='h-4 w-4' />
                {t('feedback.dislike')}
              </Button>
            </div>
          </div>
        )}

        {step === 0 && (
          <div className='space-y-4 pt-2'>
            <p className='text-sm leading-relaxed text-muted-foreground'>
              {t('feedback.like_section.description')}{' '}
              <a
                href='https://www.gofundme.com/f/justagile-meetings-magisch-meistern?utm_campaign=p_lico+share-sheet-first-launch&utm_medium=copy_link&utm_source=customer'
                target='_blank'
                rel='noopener noreferrer'
                className='font-medium text-primary underline-offset-4 hover:underline'
              >
                {t('feedback.like_section.click_here_link')}
              </a>
            </p>
            <DialogFooter>
              <Button
                type='button'
                variant='secondary'
                className='rounded-xl'
                onClick={closeAndReset}
              >
                Close
              </Button>
            </DialogFooter>
          </div>
        )}

        {step === 1 && (
          <div className='space-y-4 pt-2'>
            <p className='text-sm text-muted-foreground'>
              {t('feedback.dislike_section.description')}
            </p>
            <Textarea
              placeholder='Tell us what we could improve…'
              rows={5}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className='resize-none rounded-xl border-border/80 bg-background'
            />
            <DialogFooter className='gap-2 sm:justify-end'>
              <Button
                type='button'
                variant='outline'
                className='rounded-xl'
                onClick={() => setStep(-1)}
              >
                Back
              </Button>
              <Button
                type='button'
                className='rounded-xl'
                onClick={handleDislikeSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                ) : null}
                {t('feedback.dislike_section.send_feedback_button')}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;
