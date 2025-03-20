import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useToast } from '@/shadcn/components/ui/use-toast';
import { useTranslations } from 'use-intl';

const RecordingPermissionRoute = ({ children }) => {
    const { toast } = useToast();
    const t=useTranslations()
  const recordingPermission = useSelector(
    (state: RootState) => state.transcription.recordingPermission
  );

 if (!recordingPermission) {
     toast({
       title: t('audio_recorder.recording_acc'),
       variant: 'destructive',
     });
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RecordingPermissionRoute;
