import React from 'react'
import { Button } from '@/shadcn/components/ui/button';
import meeting_icon from '../../../../../../assets/icons/meeting_icon.svg'
import { useNavigate } from 'react-router-dom';
import './index.css'
import { SummaryItem } from '@/modules/summary/model';
import { useTranslations } from 'use-intl';

interface SummaryGridCardProps {
  summary: SummaryItem;
}

const SummaryGridCard = ({ summary }: SummaryGridCardProps) => {
  
  const navigate = useNavigate();
  const t = useTranslations();
  return (
    <>
      <div
        className='transcription_card sm:basis-[30%] basis-[92%] cursor-pointer hover:translate-y-2'
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/summary/detail/${summary?.id}`);
        }}
      >
        <div className='container-card bg-green-box'>
          <div className='flex  items-center gap-10 mt-4'>
            <div className='w-[20%] summaryimg'>
              <img
                src={meeting_icon}
                alt='meeting_icon'
              />
            </div>

            <p className='font-bold text-lg'>{summary?.title}</p>
          </div>
          <div className='flex flex-col gap-2 mt-5'>
            <div className='flex  font-semibold'>
              <p className='basis-[40%]'>
                {t('transcription.transcription')} :
              </p>
              {summary?.transcription?.title}
            </div>
            <div className='flex font-semibold'>
              <p className='basis-[40%] '>{t('meeting.project')} : </p>
              <p>{summary?.project?.name}</p>
            </div>
          </div>
          <div className='flex justify-end pr-3 mt-5 font-bold'>
            <div className='flex gap-4'>
              <Button
                className='!w-[5rem] text-[16px]'
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/summary/detail/${summary?.id}`);
                }}
              >
                {t('meeting.view_meeting')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SummaryGridCard