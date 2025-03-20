import TranscriptionCard from './transcription-card';
import TranscriptionTitleDescriptionDialog from '../../show-title-description-dialog';
import { ITranscription } from '@/modules/transcription/models';
import { useState } from 'react';
import UpdateTranscription from '../../update-transcription';
import SkeletonLoader from '@/shadcn/components/shared/skelton-loader';


interface ITranscriptionGridView {
  search: string;
  filterTranscriptions: ITranscription[];
  isLoading: boolean
  isError:boolean
}

const TranscriptionGridView = ({
  filterTranscriptions,
  isLoading,
}: ITranscriptionGridView) => {
  const [ transcriptionTitleDescriptionDialogOpen, setTranscriptionTitleDescriptionDialogOpen] = useState<boolean>(false);
  const [ titleDescriptionSelectedTranscription, setTitleDescriptionSelectedTranscription,] = useState<ITranscription>();
  const [updateTranscriptiontDialogOpen, setUpdateTranscriptiontDialogOpen] =useState<boolean>(false);
  
  
  if (isLoading) {
    return (
      <SkeletonLoader
        count={6}
        height='h-[200px]'
        width='w-[300px]'
      />
    );
  }
  

  return (
    <>
      <div className='flex  flex-wrap gap-10 sm:justify-start justify-center items-center'>
        {filterTranscriptions?.map((item, index) => (
          <TranscriptionCard
            key={`${index} + ${item.title}`}
            Transcription={item}
            setTranscriptionTitleDescriptionDialogOpen={
              setTranscriptionTitleDescriptionDialogOpen
            }
            setTitleDescriptionSelectedTranscription={
              setTitleDescriptionSelectedTranscription
            }
            setUpdateTranscriptiontDialogOpen={
              setUpdateTranscriptiontDialogOpen
            }
          />
        ))}
      </div>
      <TranscriptionTitleDescriptionDialog
        transcriptionTitleDescriptionDialogOpen={
          transcriptionTitleDescriptionDialogOpen
        }
        setTranscriptionTitleDescriptionDialogOpen={
          setTranscriptionTitleDescriptionDialogOpen
        }
        transcriptionName={titleDescriptionSelectedTranscription?.title}
        transcriptionDetails={
          titleDescriptionSelectedTranscription?.created_by?.name
        }
      />
      <UpdateTranscription
        updateTranscriptiontDialogOpen={updateTranscriptiontDialogOpen}
        setUpdateTranscriptiontDialogOpen={setUpdateTranscriptiontDialogOpen}
      />
    </>
  );
};

export default TranscriptionGridView;
