import {  HelpCircleIcon } from 'lucide-react';
import './index.css';
import AudioRecorder from '@/modules/audio-recorder/pages/AudioRecorder';
import { useNavigate } from 'react-router-dom';
import GlobalSearchPage from '@/modules/global-search/pages/globalSearchPage';
import UploadRecording from '@/modules/upload-recording/pages/uploadRecording';

const FloatingButtons = () => {
  const navigate = useNavigate();

  return (
    <div
      className='
             fixed  inset-x-[88%]  bottom-[20%]  z-20  text-[#89d289] flex gap-3 transform rotate-90
             '
    >
      <div
        className={`  ${'support_floating_button_outer'}  transform -rotate-90`}
      >
        <div
          className={`flex justify-center items-center ${'floating_button_inner'}`}
        >
          <AudioRecorder />
        </div>
      </div>
      <div>
        <GlobalSearchPage />
      </div>
      <div
        className={`  ${'floating_button_outer'}  transform -rotate-90`}
        onClick={() => {
          navigate('/support');
        }}
      >
        <div
          className={`flex justify-center items-center ${'floating_button_inner'}`}
        >
          <HelpCircleIcon size={16} />
        </div>
      </div>
      <div
        className={`  ${'support_floating_button_outer'}  transform -rotate-90`}
      >
        <div
          className={`flex justify-center items-center ${'floating_button_inner'}`}
        >
         <UploadRecording/>
        </div>
      </div>
    </div>
  );
};

export default FloatingButtons;

