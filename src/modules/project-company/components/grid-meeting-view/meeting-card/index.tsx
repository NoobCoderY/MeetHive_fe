import { Button } from '@/shadcn/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTranslations } from 'use-intl';
import meeting_icon from '../../../../../assets/icons/meeting_icon.svg'

interface ITranscriptionCard {
  Transcription: any;
  setUpdateMeetingDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MeetingCard = ({ setUpdateMeetingDialogOpen}: ITranscriptionCard) => {
  const navigate = useNavigate();
  const t=useTranslations()

  return (
    <>
      <div className='transcription_card sm:basis-[30%] basis-[92%]'>
        <div className='container-card bg-green-box'>
          <div className='flex  items-center'>
            <div className='w-[40%]'>
             <img src={meeting_icon} alt='meeting_icon'/>
            </div>

            <p className='font-bold text-lg'>
           JuatAgile
            </p>
          </div>
          <div className='mt-3 flex flex-col gap-2'>
            <div className='flex  font-semibold'>
              <p className='basis-[40%]'>{t('meeting.company')} :</p>
              JustAgile
            </div>
            <div className='flex font-semibold'>
              <p className='basis-[40%] '>{t('meeting.project')} : </p>
              <p>JustAgile</p>
            </div>
          </div>
          <div className='flex justify-end pr-3 mt-5 font-bold'>
            <div className='flex gap-4'>
              <Button
                className='!w-[5rem] text-[14px]'
                onClick={() => {
                  navigate('/transcription/detail');
                }}
              >
                {t('meeting.view_meeting')}
              </Button>
              <Button
                onClick={() => {
                 setUpdateMeetingDialogOpen((prev)=>!prev)
                }}
              >
                {t('meeting.update_meeting_btn')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MeetingCard;
