import UploadIcon from '../../../assets/meeting-provider-icons/upload-icon.png';
import ZoomIcon from '../../../assets/meeting-provider-icons/zoom.png';
import GoogleMeetsIcon from '../../../assets/meeting-provider-icons/google-meet.png';
import MicrosoftTeamsIcon from '../../../assets/meeting-provider-icons/microsoft-teams.png';
import SkypeIcon from '../../../assets/meeting-provider-icons/skype.png';
import GoogleHangoutIcon from '../../../assets/meeting-provider-icons/google-hangouts.png';





export const meetingProviderList = [
  {
    id: 1,
    name: 'Upload',
    icon: UploadIcon,
  },
  {
    id: 2,
    name: 'Zoom',
    icon: ZoomIcon,
  },
  {
    id: 3,
    name: 'Google meet',
    icon: GoogleMeetsIcon,
  },
  {
    id: 4,
    name: 'Microsoft Teams',
    icon: MicrosoftTeamsIcon,
  },
  {
    id: 5,
    name: 'Skype',
    icon: SkypeIcon,
  },
  {
    id: 6,
    name: 'Google Hangouts',
    icon: GoogleHangoutIcon,
  },
];

// List of allowed audio and video extensions for AWS Transcribe
export const allowedFileTypes = [
  'audio/amr',
  'audio/flac',
  'audio/wav',
  'audio/ogg',
  'audio/mp3',
  'video/mp4',
  'video/webm',
  'audio/m4a'
];
const validFileSize = 200; // in MB

const isCheckValidType = (file: File): boolean => {

  const fileType = file.type;
  return allowedFileTypes.includes(fileType);
};




export const parsedMediaFile = (
  file: File
): Promise<{
  error: boolean;
  message?: string;
  duration?: number;
}> => {


  return new Promise((resolve, reject) => {
    // Check for valid file type
    if (!isCheckValidType(file)) {
      return reject({
        error: true,
        errMessage: 'fileTypeNotAllowed',
      });
    }

    // Step 2: Check file size in MB
    const fileSize = file.size / (1024 * 1024);
    if (fileSize > validFileSize) {
      return reject({
        error: true,
        errMessage: 'fileSizeTooLarge',
      });
    }

    // Step 3: Get the duration of the file
    const mediaElement = document.createElement(
      file.type.startsWith('audio') ? 'audio' : 'video'
    );
    mediaElement.src = URL.createObjectURL(file);

    mediaElement.onloadedmetadata = () => {
      const duration = mediaElement.duration;
      resolve({
        error: false,
        duration,
      });
    };

    mediaElement.onerror = () => {
      reject({
        error: true,
        errMessage: 'durationLoadError'
      });
    };
  });
};
