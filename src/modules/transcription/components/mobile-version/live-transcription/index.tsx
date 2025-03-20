import { ChevronsDown, ChevronsUp, Speech } from 'lucide-react';
import { useState } from 'react';
import './index.css';
import { Card } from '@/shadcn/components/ui/card';
import { useTranslations } from 'use-intl';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { SpeakerSpeech } from '@/modules/transcription/models';

const MLiveTranscription = () => {
  const t = useTranslations();
  const [toggleAccordian, setToggleAccordian] = useState(false);

  const { currentTranscription } = useSelector(
    (state: RootState) => state.transcription
  );

  return (
    <div className='px-3'>
      {toggleAccordian ? (
        <Card
          className='flex justify-between p-2'
          onClick={() => setToggleAccordian(!toggleAccordian)}
        >
          <h1 className='text-md'>
            {' '}
            {t('transcription.real_time_transcription')}
          </h1>
          <span>
            <ChevronsDown
              color='#89d289'
              size={28}
            />
          </span>
        </Card>
      ) : (
        <>
          <div className='relative'>
            <div className='absolute left-2 text-xl'>
              {' '}
              {t('transcription.real_time_transcription')}
            </div>
            <div className='  absolute right-[4px] top-[5px] z-10 w-[21.3%] flex justify-center items-center'>
              <div className='card_close_button_outer w-[100%] h-[100%] '>
                <div
                  className='card_close_button_inner w-[100%] h-[100%]  flex justify-center items-center py-[0.1rem] pl-[3px] '
                  onClick={() => setToggleAccordian(!toggleAccordian)}
                >
                  <ChevronsUp
                    size={27}
                    color='#97ec97'
                  />
                </div>
              </div>
            </div>
            <div className='todos_summary_outer_card w-[100%] h-[100%]'>
              <div className='todos_summary_inner_card w-[100%] h-[100%]'>
                <div className='  px-3 pt-12 pb-6 h-[24rem]'>
                  <div className='overflow-auto max-h-[16rem]'>
                    {currentTranscription.content.map(
                      (item: SpeakerSpeech, index) => {
                        return (
                          <div
                            className='flex gap-3 mt-5'
                            key={`${index}+ ${item}`}
                          >
                            <div className='flex justify-start h-[100%]'>
                              <div className=' flex-none min-w-[6vw] min-h-[4vh] rounded-[50%] bg-slate-400 flex justify-center items-center'>
                                <Speech size={15} />
                              </div>
                            </div>
                            <div>
                              <div className='flex gap-1'>
                                <span className='text-[0.75rem]'>
                                  {item.speaker}
                                </span>
                                <span className='text-[0.7rem] text-gray-500'>
                                  {item.startTime}
                                </span>
                              </div>
                              <p className='text-[0.65rem]'>{item.speech}</p>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MLiveTranscription;
