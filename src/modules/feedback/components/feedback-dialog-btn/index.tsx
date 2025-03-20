import JAButton from '@/shadcn/atoms/ja-button';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useTranslations } from 'use-intl';
import useResponsive from '@/hooks/useResponsive';
import { MessageSquareMore } from 'lucide-react';



interface IFeedBackBtnProps {
  setFeedbackDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FeedbackDialogBtn = ({ setFeedbackDialogOpen }: IFeedBackBtnProps) => {
    const t = useTranslations();
    const breakPoints  = useResponsive([600, 900, 1400]);
  const openfeedBackDialog = () => {
    setFeedbackDialogOpen((open) => !open);
  };

    return (
      <>
        {breakPoints == 0 ? (
          <span
            onClick={openfeedBackDialog}
          >
            <MessageSquareMore/>
          </span>
        ) : (
          <JAButton
            variant={'outline'}
            className='flex justify-center gap-1 text-[#89d289] w-[14vw]'
            onClick={openfeedBackDialog}
          >
            <span className='flex'>
              <ThumbsUp size={12} />
              <ThumbsDown
                size={12}
                className='mt-2'
              />
            </span>
            {t('feedback.feedback_btn')}
          </JAButton>
        )}
      </>
    );
};

export default FeedbackDialogBtn;
