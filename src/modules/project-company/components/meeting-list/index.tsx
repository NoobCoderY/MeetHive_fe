import useResponsive from '@/hooks/useResponsive';
import  {  useState } from 'react'
import { useTranslations } from 'use-intl';
import { Columns3, LayoutGrid, Plus, Search } from 'lucide-react';
import MeetingListView from '../list-meeting-view';
import { CreateMeetingDialog } from '../create-meeting-dialog-form';
import MeetingGridView from '../grid-meeting-view';

const MeetingList = () => {
 
  const [layoutView, setLayoutView] = useState<number>(0);
  const [addMeetingModal, setAddMeetingModal] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const t = useTranslations();

    const breakPoints = useResponsive([600, 900, 1400]);
    const changeLayoutView = (view: string) => {
      view === 'grid' ? setLayoutView(0) : setLayoutView(1);
    };
  return (
    <>
      <div className='mb-4 flex justify-between items-center px-2 flex-wrap sm:mt-0 mt-4'>
        <div className=' flex gap-4 items-center justify-center'>
          <p className='text-2xl font-semibold leading-7'>
            {t('meeting.meeting_title')}
          </p>
        </div>
        <div
          className='border-[1px]  px-6 cursor-pointer py-[0.4rem] rounded-md bg-popover text-popover-foreground text-[#9a9a9a]'
          onClick={() => setAddMeetingModal((prev) => !prev)}
        >
          {
            <div className='flex gap-4 items-center'>
              <span className='text-[1.1rem]'>
                {t('meeting.default_meeting_create_btn')}
              </span>
              <span>
                <Plus size={20} />
              </span>
            </div>
          }
        </div>
        <div className='sm:w-[30%] w-[90%] sm:mt-0 mt-4 m-auto sm:m-0'>
          <div className='rounded-lg mr-4 flex relative'>
            <input
              type='text'
              placeholder={t('meeting.meeting_search_placeholder')}
              className='rounded-lg border shadow-md pr-8 pl-10 py-2 w-full placeholder:text-[12px] bg-popover text-popover-foreground text-[#969696] !outline-none'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className='absolute top-3 left-3'>
              <Search
                size={22}
                color='#969696'
              />
            </span>
          </div>
        </div>
      </div>
      {breakPoints != 0 && (
        <div className='mb-4 flex justify-end px-2'>
          <div className=' w-[10%]  transcription_list_layout flex border-[1px] rounded-lg'>
            <div
              className={`p-2 basis-[50%] flex justify-center items-center border-r-[1px]  cursor-pointer ${
                layoutView === 0
                  ? 'bg-[#89D289] rounded-tl-lg rounded-bl-lg '
                  : ''
              }`}
              onClick={() => {
                changeLayoutView('grid');
              }}
            >
              <LayoutGrid size={25} />
            </div>
            <div
              className={`p-2 basis-[50%] cursor-pointer  flex justify-center items-center  ${
                layoutView === 1
                  ? 'bg-[#89D289] rounded-tr-lg rounded-br-lg'
                  : ''
              }`}
              onClick={() => {
                changeLayoutView('list');
              }}
            >
              <Columns3 size={25} />
            </div>
          </div>
        </div>
      )}
      {breakPoints === 0 ? (
        <MeetingGridView />
      ) : layoutView === 0 ? (
        <MeetingGridView />
      ) : (
        <MeetingListView />
      )}
      <CreateMeetingDialog
        setCreateMeetingtDialogOpen={setAddMeetingModal}
        createMeetingDialogOpen={addMeetingModal}
      />
    </>
  );
}

export default MeetingList


