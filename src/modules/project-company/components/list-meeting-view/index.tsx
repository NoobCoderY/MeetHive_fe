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
import { useTranslations } from 'use-intl';
import UpdateMeeting from '../update-meeting-dialog';
import { useState } from 'react';

const dummyArray = Array.from({ length: 10 }, (_, index) => index);

const MeetingListView = () => {
  const navigate = useNavigate();
  const t = useTranslations();
  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

  return (
    <div className=''>
      <>
        <div className='overflow-x-auto '>
          <Table className='min-w-full'>
            <TableHeader>
              <TableRow className='hover:bg-transparent'>
                <TableHead className='whitespace-nowrap'>
                  {t('meeting.meeting_name')}
                </TableHead>
                <TableHead className='whitespace-nowrap'>
                  {t('meeting.company')}
                </TableHead>
                <TableHead className='text-center whitespace-nowrap'>
                  {t('meeting.project')}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyArray.map((transciption) => (
                <TableRow
                  key={`${transciption}`}
                  className='cursor-pointer '
                >
                  <TableCell className='font-medium h-[5vh] sm:h-[3vh] '>
                    <div className='flex items-center gap-3'>
                      <span className='flex w-[20px] h-[20px] items-center'>
                        <Captions />
                      </span>
                      <span className='ml-3 cursor-pointer'>JustAgile</span>
                    </div>
                  </TableCell>
                  <TableCell>JustAgile</TableCell>
                  <TableCell className='text-center'>JustAgile</TableCell>

                  <TableCell className='text-right'>
                    <div className=''>
                      <Button
                        className='cursor-pointer mr-4 !w-[5rem]'
                        onClick={() => {
                          navigate('/transcription/detail');
                        }}
                      >
                        {t('meeting.view_meeting')}
                      </Button>
                      <Button
                        onClick={() => {
                          setUpdateMeetingDialogOpen((prev) => !prev);
                        }}
                      >
                        {t('meeting.update_meeting_btn')}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </>
      <UpdateMeeting
        updateMeetingDialogOpen={updateMeetingDialogOpen}
        setUpdateMeetingDialogOpen={setUpdateMeetingDialogOpen}
      />
    </div>
  );
};

export default MeetingListView;
