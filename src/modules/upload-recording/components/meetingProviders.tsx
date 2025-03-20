import { Button } from '@/shadcn/components/ui/button';
import { CheckCheck, LoaderIcon, TrashIcon } from 'lucide-react';
import React, { useState } from 'react';
import { Separator } from '@/shadcn/components/ui/separator';
import { useTranslations } from 'use-intl';
import { IMeetingProviderListType } from '../models';

interface IMeetingProvidersListProps {
  setSelectDialogComponent: React.Dispatch<React.SetStateAction<number>>;
  meetingProviderList: IMeetingProviderListType[];
}

const MeetingProviders = ({
  setSelectDialogComponent,
  meetingProviderList,
}: IMeetingProvidersListProps) => {
  const [isTokenLoading, setIsTokenLoading] = useState<boolean>(false);
  const [selctMeetingProvider, setSelectMeetingProvider] = useState<
    number | undefined
  >();

  const  t  = useTranslations();
  return (
    <div>
      <h1 className='text-center sm:text-xl text-md font-semibold '>
        {t('upload_recording.meeting_provider_page_title')}
      </h1>
      <div className='m-4'>
        <h2 className='sm:text-md text-sm md:text-md lg:text-xl font-semibold'>
          {t('upload_recording.meeting_provider_page_subtitle')}
        </h2>
        <div className='flex flex-col gap-4 mt-3'>
          {meetingProviderList.map(
            (value: IMeetingProviderListType, index: number) => {
              return (
                <div
                  className='cursor-pointer'
                  key={`meeting-provider-${index}`}
                >
                  <div className='flex justify-between '>
                    <div className='flex gap-6 items-center'>
                      <img
                        src={value.icon}
                        alt='zoom'
                        width={20}
                        height={20}
                      />
                      <span className='sm:text-md text-sm md:text-md lg:text-lg '>
                        {value.name}
                      </span>
                    </div>
                    {index > 0 && (
                      <div className='flex items-center'>
                        {index === selctMeetingProvider &&
                          (isTokenLoading ? (
                            <span>
                              <LoaderIcon className='animate-spin' />
                            </span>
                          ) : (
                            <span>
                              <CheckCheck />
                            </span>
                          ))}
                        <Button
                          variant='outline'
                          className='ml-3 h-7 !px-2'
                          size='sm'
                        >
                          <TrashIcon size={15} />
                        </Button>
                      </div>
                    )}
                  </div>
                  <Separator className='mt-2' />
                </div>
              );
            }
          )}
        </div>
      </div>
      <div className='flex justify-end gap-4'>
        <Button
          className=' text-lg  font-semibold !text-center px-6 pt-4 pb-5'
          variant={'default'}
          onClick={() =>
            setSelectDialogComponent(selctMeetingProvider === 0 ? 3 : 2)
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default MeetingProviders;
