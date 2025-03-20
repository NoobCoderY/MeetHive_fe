import { SpeakerSpeech } from '../models';

export const parseSpeakerArray = (inputArray: SpeakerSpeech[]) => {
  return inputArray?.map((item: SpeakerSpeech) => {
    const [speaker, ...speechParts] = item.speech.split(' : ');
    const speech = speechParts.join(' : ');
    const startTime = item.startTime;
    return { speaker, speech, startTime };
  });
};

export const convertSeconds = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = (seconds % 60).toFixed(2);

  let timeString = '';

  if (hours > 0) {
    timeString += `${hours}h `;
  }
  if (minutes > 0 || hours > 0) {
    timeString += `${minutes}m `;
  }
  timeString += `${remainingSeconds}s`;

  return timeString.trim();
};
