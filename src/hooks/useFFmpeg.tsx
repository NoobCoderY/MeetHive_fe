import { createFFmpeg } from '@ffmpeg/ffmpeg';
import { useEffect, useState } from 'react';

const ffmpeg = createFFmpeg({ log: true });

export const useFFmpeg = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFFmpeg = async () => {
      try {
        await ffmpeg.load();
        console.log('FFmpeg is ready to use!');
      } catch (error) {
        console.error('Error loading FFmpeg:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFFmpeg();
  }, []);

  return { ffmpeg, isLoading };
};
