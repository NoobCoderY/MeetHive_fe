import useResponsive from '@/hooks/useResponsive';
import React from 'react'
import MTranscriptionDetail from '../components/mobile-version/transcription-detail';
import TranscriptionDetail from '../components/transcription-detail';

const TranscriptionDetailPage = () => {
     const breakPoints = useResponsive([600, 900, 1400]);
  return (
    <div>
      {breakPoints === 0 ? <MTranscriptionDetail /> : <TranscriptionDetail/>}
    </div>
  );
}

export default TranscriptionDetailPage