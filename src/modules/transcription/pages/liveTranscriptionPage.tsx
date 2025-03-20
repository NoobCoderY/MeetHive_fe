import useResponsive from '@/hooks/useResponsive';
import LiveTranscription from '../components/live-transcription';
import MLiveTranscription from '../components/mobile-version/live-transcription';

const LiveTranscriptionPage = () => {
  const breakPoints = useResponsive([600, 900, 1400]);
  return (
    <div>
      {breakPoints === 0 ? <MLiveTranscription /> : <LiveTranscription/>}
    </div>
  );
};

export default LiveTranscriptionPage;
