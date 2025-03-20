/* eslint-disable */
import React, { useState } from 'react';
import { Button } from '@/shadcn/components/ui/button';
import { Separator } from '@/shadcn/components/ui/separator';
import { Skeleton } from '@/shadcn/components/ui/skeleton';
import { CheckCheck, Disc } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { useTranslations } from 'use-intl';
import { IRecordingType } from '../models';
import DatePickerRange from '@/shadcn/components/shared/date-picker-range';

interface IRecordingListProps {
  setSelectDialogComponent: React.Dispatch<React.SetStateAction<number>>;
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

const ZoomRecording = ({
  setSelectDialogComponent,
  date,
  setDate,
  setIsDialogOpen,
}: IRecordingListProps) => {
  const [selectRecording, setSelectRecording] = useState<number | undefined>();
  const [recordings, setRecordings] = useState<IRecordingType[]>([]);
  const [isRecordingLoading, setIsRecordingLoading] = useState<boolean>(false);
  const  t  = useTranslations();
  return (
    <div className='p-4'>
      <div className=' flex  items-center justify-center mb-3'>
        <DatePickerRange
          date={date}
          setDate={setDate}
        />
      </div>
      <h1 className='text-center sm:text-md text-sm md:text-md lg:text-xl  font-semibold'>
        {t('upload_recording.recording_list_page_title')}
      </h1>
      <div className='m-4'>
        <h2 className='sm:text-md text-sm md:text-md lg:text-xl font-semibold'>
          {t('upload_recording.recording_list_page_subtitle')}
        </h2>
        <div className='flex flex-col gap-4 mt-6 overflow-auto h-[38vh] no-scrollbar'>
          {isRecordingLoading ? (
            <>
              {recordings?.map((value, index) => {
                return (
                  <div
                    key={`recording-${index}`}
                    className='cursor-pointer sm:text-md text-sm md:text-md lg:text-xl'
                    onClick={() => setSelectRecording(index)}
                  >
                    <div className='flex justify-between '>
                      <div className='flex  items-center '>
                        <span className='inline-block mr-4'>
                          <Disc size={20} />
                        </span>
                        <span className='mr-1'>{value.topic}</span>.
                        <span className='ml-1'>
                          {value.recording_files[0].file_type}
                        </span>
                      </div>
                      <div>
                        {index === selectRecording && (
                          <span>
                            <CheckCheck />
                          </span>
                        )}
                      </div>
                    </div>
                    <Separator className='mt-3' />
                  </div>
                );
              })}
            </>
          ) : (
            <div className='flex flex-col gap-2'>
              <Skeleton className='h-[7vh] w-[100%] rounded-xl' />
              <Skeleton className='h-[7vh] w-[100%] rounded-xl' />
              <Skeleton className='h-[7vh] w-[100%] rounded-xl' />
              <Skeleton className='h-[7vh] w-[100%] rounded-xl' />
              <Skeleton className='h-[7vh] w-[100%] rounded-xl' />
            </div>
          )}
        </div>
      </div>
      <div className='flex justify-end gap-4'>
        <Button
          className='sm:w-[8vw] md:w-[8vw] w-[21vw] text-xl font-semibold sm:text-xl md:text-xl lg:text-xl text-md'
          variant={'outline'}
          onClick={() => setSelectDialogComponent(1)}
        >
          prev
        </Button>
        <Button
          className='sm:w-[8vw] md:w-[8vw] w-[21vw] sm:text-xl md:text-xl lg:text-xl text-md font-semibold'
          variant={'default'}
          onClick={() => setSelectDialogComponent(3)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ZoomRecording;
