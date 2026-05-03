import { Button } from '@/shadcn/components/ui/button';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useTranslations } from 'use-intl';
import useResponsive from '@/hooks/useResponsive';
import { MessageSquareMore } from 'lucide-react';

interface IFeedBackBtnProps {
  setFeedbackDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FeedbackDialogBtn = ({ setFeedbackDialogOpen }: IFeedBackBtnProps) => {
  const t = useTranslations();
  const breakPoints = useResponsive([600, 900, 1400]);

  const openfeedBackDialog = () => {
    setFeedbackDialogOpen(true);
  };

  return (
    <>
      {breakPoints === 0 ? (
        <Button
          type='button'
          variant='ghost'
          size='icon'
          className='rounded-xl'
          onClick={openfeedBackDialog}
          aria-label={t('feedback.feedback_btn')}
        >
          <MessageSquareMore className='h-5 w-5' />
        </Button>
      ) : (
        <Button
          type='button'
          variant='outline'
          size='sm'
          className='gap-2 rounded-xl border-border/70'
          onClick={openfeedBackDialog}
        >
          <span className='flex items-center gap-1'>
            <ThumbsUp className='h-3.5 w-3.5' />
            <ThumbsDown className='h-3.5 w-3.5' />
          </span>
          {t('feedback.feedback_btn')}
        </Button>
      )}
    </>
  );
};

export default FeedbackDialogBtn;
