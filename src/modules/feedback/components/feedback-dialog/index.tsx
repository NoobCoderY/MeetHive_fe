import {
  FeedbackDialogContent,
  FeedbackDialog as ShadcnFeedbackDialog,
} from '@/shadcn/components/shared/feedback';
import React, { useState } from 'react';
import { useTranslations } from 'use-intl';
import './index.css';
import { Cross2Icon, ReloadIcon } from '@radix-ui/react-icons';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import JAButton from '@/shadcn/atoms/ja-button';
import { Card } from '@/shadcn/components/ui/card';
import { Button } from '@/shadcn/components/ui/button';
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

  const [feedbackContent, setFeedbackContent] = useState(
    'Wow, this product is fantastic!'
  );
  const [likeDislikeTrack, setLikeDislikeTrack] = useState<number>(-1);
  const { toast } = useToast();
  const [createFeedback, { isLoading }] = useCreateFeedbackMutation();

 
  const handleEditChange = (event: React.ChangeEvent<HTMLParagraphElement>) => {
    setFeedbackContent(event.target.innerText);
  };

 
  const handleLike = async () => {
    try {
      await createFeedback({
        reaction: true,
        feedback: feedbackContent,
      }).unwrap();
      toast({ title: 'Success', description: t('feedback.feedback_success') });
    } catch (error) {
      toast({
        title: 'Error',
        description: error?.data?.error || t('dashboard.error'),
        variant: 'destructive',
      });
    }
  };


  const handleDislike = async () => {
    try {
      await createFeedback({
        reaction: false,
        feedback: feedbackContent,
      }).unwrap();
      toast({ title: 'Success', description: t('feedback.feedback_success') });
      resetFeedback();
    } catch (error) {
      toast({
        title: 'Error',
        description: error?.data?.error || t('dashboard.error'),
        variant: 'destructive',
      });
      resetFeedback();
    }
  };


  const resetFeedback = () => {
    setFeedbackDialogOpen(false);
    setFeedbackContent('');
    setLikeDislikeTrack(-1);
  };

  
  const getFeedbackClasses = () => {
    if (likeDislikeTrack === -1)
      return 'without_expand_feedback_dialog_outer_card';
    if (likeDislikeTrack === 0)
      return 'feedback_dialog_outer_card_like min-h-[20vh]';
    if (likeDislikeTrack === 1)
      return 'feedback_dialog_outer_card_dislike min-h-[20vh]';
  };

  const getInnerFeedbackClasses = () => {
    if (likeDislikeTrack === -1)
      return 'without_expand_feedback_dialog_inner_card';
    if (likeDislikeTrack === 0) return 'feedback_dialog_inner_card_like';
    return 'feedback_dialog_inner_card_dislike';
  };

  return (
    <div className='flex justify-center'>
      <ShadcnFeedbackDialog
        open={feedbackDialogOpen}
        onOpenChange={setFeedbackDialogOpen}
      >
        <FeedbackDialogContent className='sm:max-w-[400px] md:max-w-[500px] lg:max-w-[500px] max-w-[300px] feedback_dialog_card'>
          <div
            className={`absolute top-7 lg:text-[1.1rem] md:text-[1rem] leading-5 font-semibold ${
              likeDislikeTrack === -1
                ? 'sm:top-[-2%] left-[4%] top-[0%] sm:text-[15px] text-[0.85rem]'
                : likeDislikeTrack === 0
                ? 'left-[2%] sm:text-[1.2rem] tracking-wider text-[12px] sm:top-[2%] top-[0%]'
                : 'sm:left-[10%] sm:text-[15px] md:text-[2rem] tracking-wider text-[12px] left-[1%] top-[0%] sm:top-[2%]'
            }`}
          >
            {t('feedback.feedback_description')}
          </div>
          <div className={`min-h-[15vh] ${getFeedbackClasses()}`}>
            <div className={getInnerFeedbackClasses()}>
              <div
                className={`outer_cross_btn_border cursor-pointer ${
                  likeDislikeTrack === -1
                    ? 'sm:left-[84.9%] sm:top-[3.7%] sm:w-[14.5%] sm:h-[18.5%] left-[86%] top-[2%] w-[13%] h-[10.5%]'
                    : likeDislikeTrack === 0
                    ? 'sm:left-[84.9%] sm:top-[2.7%] sm:w-[14.5%] sm:h-[18.5%] left-[82.4%] top-[1.7%] h-[8.5%] w-[15.8%]'
                    : 'sm:left-[90.9%] sm:top-[1.5%] sm:w-[14.5%] sm:h-[8.9%] h-[4.9%] left-[80.5%] top-[0.5%] w-[18%]'
                }`}
              >
                <div
                  className='inner_cross_btn_border text-[#89d289]'
                  onClick={() => resetFeedback()}
                >
                  <Cross2Icon
                    width={22}
                    height={22}
                  />
                </div>
              </div>
              <div className='flex justify-center text-[#89d289]'>
                <div className='flex gap-4 sm:gap-2 sm:flex-row flex-col justify-center items-center'>
                  <div className='sm:w-[10rem] w-[35vw]'>
                    <JAButton
                      variant='outline'
                      className={`flex items-center justify-center gap-3 Ja-button-like-unlike-btn !w-[100%] ${
                        likeDislikeTrack === 0 ? 'bg-[#89d289] text-[#000]' : ''
                      }`}
                      onClick={() => {
                        setLikeDislikeTrack(0);
                        handleLike();
                      }}
                    >
                      <ThumbsUp size={18} />
                      {t('feedback.like')}
                    </JAButton>
                  </div>
                  <div className='sm:w-[10rem] w-[35vw]'>
                    <JAButton
                      variant='outline'
                      className={`flex items-center justify-center gap-3 Ja-button-like-unlike-btn sm:w-[100%] !w-[100%] ${
                        likeDislikeTrack === 1 ? 'bg-[#89d289] text-[#000]' : ''
                      }`}
                      onClick={() => setLikeDislikeTrack(1)}
                    >
                      <ThumbsDown size={18} />
                      {t('feedback.dislike')}
                    </JAButton>
                  </div>
                </div>
              </div>

              {likeDislikeTrack === 0 && (
                <div className='text-center sm:text-[14px] text-[12px] mt-4 px-4'>
                  <p>
                    {t('feedback.like_section.description')}
                    <a
                      href='https://www.gofundme.com/f/justagile-meetings-magisch-meistern?utm_campaign=p_lico+share-sheet-first-launch&utm_medium=copy_link&utm_source=customer'
                      className='text-[#89d289] ml-1'
                    >
                      {t('feedback.like_section.click_here_link')}
                    </a>
                  </p>
                </div>
              )}

              {likeDislikeTrack === 1 && (
                <div className='mt-4 px-4'>
                  <div className='text-center sm:text-[14px] text-[12px]'>
                    <p>{t('feedback.dislike_section.description')}</p>
                  </div>
                  <div className='flex justify-center items-center'>
                    <Card className='p-4 rounded-none border-[#97ec97] mt-4 sm:w-[500px] w-[250px] break-words text-wrap overflow-auto h-[18vh]'>
                      <p
                        className='text-[12px] leading-[20px] font-extralight !border-0 !outline-none h-[100%] break-words text-wrap'
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onInput={handleEditChange}
                      ></p>
                    </Card>
                  </div>
                  <div className='mt-4 flex justify-center'>
                    <Button
                      variant='default'
                      className='bg-[#89d289] sm:w-[30%] w-[60%]'
                      onClick={() => handleDislike()}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className='mr-2'>
                          <ReloadIcon
                            className='animate-spin'
                            width={18}
                            height={18}
                          />
                        </div>
                      ) : (
                        t('feedback.dislike_section.send_feedback_button')
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </FeedbackDialogContent>
      </ShadcnFeedbackDialog>
    </div>
  );
};

export default FeedbackDialog;
