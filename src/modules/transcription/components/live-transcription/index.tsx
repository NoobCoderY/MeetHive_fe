import './index.css';
import { Speech } from 'lucide-react';
import SaveTranscriptionDialog from '../save-transcription-dailog';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { SpeakerSpeech } from '../../models';
import { useTranslations } from 'use-intl';


const LiveTranscription = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const t = useTranslations();

  const { currentTranscription } = useSelector(
    (state: RootState) => state.transcription
  );

  return (
    <>
      <div>
        <div className='relative'>
          <div className='absolute pl-[0.7rem]'>
            <h1 className='text-2xl font-bold'>
              {t('transcription.real_time_transcription')}
            </h1>
          </div>
          <div className='transcription_outer_card  '>
            <div className='transcription_inner_card '>
              <div className='mt-14 mb-10'>
                <div className='flex flex-col gap-4 h-64 overflow-y-scroll'>
                  {currentTranscription.content.map(
                    (item: SpeakerSpeech, index) => {
                      return (
                        <div
                          className='flex gap-3 items-center'
                          key={`${index}+ ${item}`}
                        >
                          <div className=' min-w-[35px] min-h-[35px] rounded-[50%] bg-slate-400 flex justify-center items-center'>
                            <Speech size={20} />
                          </div>
                          <div>
                            <div className='flex gap-2 '>
                              <span className='text-[0.85rem] font-semibold'>
                                {item.speaker}
                              </span>
                              <span className='text-[0.8rem] text-[#B9BBBD]'>
                                {item.startTime}
                              </span>
                            </div>
                            <p className='text-[0.75rem]  text-[#E0E2E4] transcription_detail_text'>
                              {item.speech}
                            </p>
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
      </div>
      <SaveTranscriptionDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </>
  );
};

export default LiveTranscription;
