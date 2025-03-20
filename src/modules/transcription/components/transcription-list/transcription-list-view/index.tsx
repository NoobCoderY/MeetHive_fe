import { Button } from '@/shadcn/components/ui/button';
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/shadcn/components/ui/table';
import { Captions } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ITranscription } from '@/modules/transcription/models';
import { useState } from 'react';
import TranscriptionTitleDescriptionDialog from '../../show-title-description-dialog';
import { useDispatch } from 'react-redux';
import { selectedTranscription } from '@/modules/transcription/slice/transcriptionSlice';
import UpdateTranscription from '../../update-transcription';
import { useTranslations } from 'use-intl';
import SkeletonLoader from '@/shadcn/components/shared/skelton-loader';

interface ITranscriptionListView {
  search: string;
  filterTranscriptions: ITranscription[];
  isLoading: boolean;
  isError: boolean;
}

const TranscriptionListView = ({
  filterTranscriptions,
  isLoading,
  isError,
}: ITranscriptionListView) => {
  const navigate = useNavigate();
  const [
    transcriptionTitleDescriptionDialogOpen,
    setTranscriptionTitleDescriptionDialogOpen,
  ] = useState<boolean>(false);
  const [updateTranscriptiontDialogOpen, setUpdateTranscriptiontDialogOpen] =
    useState<boolean>(false);
  const [
    titleDescriptionSelectedTranscription,
    setTitleDescriptionSelectedTranscription,
  ] = useState<ITranscription>();
  const dispatch = useDispatch();
  const t = useTranslations();

   if (isLoading || isError) {
     return (
       <SkeletonLoader
         count={4}
         height='h-[10vh]'
         width='w-[100%]'
         className='!flex-col !gap-4'
       />
     );
   }

  return (
    <div className=''>
      <>
        <div className='overflow-x-auto '>
          <Table className='min-w-full'>
            <TableHeader>
              <TableRow className='hover:bg-transparent'>
                <TableHead className='whitespace-nowrap'>
                  {t('transcription.transcription_name')}
                </TableHead>
                <TableHead className='whitespace-nowrap'>
                  {t('transcription.created_by')}
                </TableHead>
                <TableHead className='text-center whitespace-nowrap'>
                  {t('transcription.transcription_duration')}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filterTranscriptions.map((transciption) => {
                return (
                  <TableRow
                    key={`${transciption?.id}`}
                    className='cursor-pointer'
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/transcription/detail/${transciption?.id}`);
                    }}
                  >
                    <TableCell className='font-medium h-[5vh] sm:h-[3vh] '>
                      <div className='flex items-center gap-3'>
                        <span className='flex w-[20px] h-[20px] items-center'>
                          <Captions />
                        </span>
                        <span
                          className='ml-3'
                          onClick={() => {
                            setTitleDescriptionSelectedTranscription(
                              transciption
                            );
                            setTranscriptionTitleDescriptionDialogOpen(
                              (prev) => !prev
                            );
                          }}
                        >
                          {transciption?.title.length > 15
                            ? `${transciption?.title.slice(0, 15)}...`
                            : transciption?.title}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell
                      onClick={(e) => {
                        e.stopPropagation();
                        setTitleDescriptionSelectedTranscription(transciption);
                        setTranscriptionTitleDescriptionDialogOpen(
                          (prev) => !prev
                        );
                      }}
                    >
                 { transciption?.created_by?.name?.length > 15
                  ? `${transciption?.created_by?.name?.slice(0, 15)}...`
                  : transciption?.created_by?.name}
                    </TableCell>

                    <TableCell className='text-center'>
                      {
                        transciption?.text?.content.length > 1
                          ? transciption?.text?.content[
                              transciption?.text?.content.length - 1
                            ].startTime
                          : transciption?.text?.content[0]?.startTime

                      }
                    </TableCell>
                    <TableCell className='text-right'>
                      <Button
                        className='cursor-pointer mr-4'
                        onClick={(e) => {   
                          e.stopPropagation();
                          dispatch(selectedTranscription(transciption));
                          setUpdateTranscriptiontDialogOpen(true);
                        }}
                      >
                        {t('transcription.update')}
                      </Button>
                      <Button
                        className='cursor-pointer mr-4'
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(selectedTranscription(transciption));
                         navigate(`/summary/detail/${transciption?.summary}`);
                        }}
                        disabled={!transciption?.summary}
                      >
                        Summary
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
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
    </div>
  );
};

export default TranscriptionListView;
