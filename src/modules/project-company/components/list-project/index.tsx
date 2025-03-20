import { useEffect, useState,useMemo } from 'react';
import { useListAllProjectQuery } from '../../services/projectApi';
import { CreateProjectDialog } from '../project-form';
import ListProjectView from '../list-project-view';
import { Plus } from 'lucide-react';
import { setProjects } from '../../slice/ProjectSlice';
import { useDispatch } from 'react-redux';
import { Search } from 'lucide-react';
import { useTranslations } from 'use-intl';
import useResponsive from '@/hooks/useResponsive';
import GridProjectView from '../mobile-version/grid-project-view';
import { toggleRecordingDisableBtn } from '@/modules/core/slice/layoutSlice';
import { CustomPagination } from '@/shadcn/components/shared/custom-pagination';
import { useDebounce } from '@/hooks/useDebounce';
import FetchError from '@/shadcn/components/shared/fetch-error';


const ListProject = () => {
  const [addProjectModal, setAddProjectModal] = useState(false);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const breakPoints = useResponsive([600, 900, 1400]);
  const debounceSearch = useDebounce(search, 500);


  const t = useTranslations();

  const dispatch = useDispatch();
  const itemsPerPage = 6;
  const { data, isLoading, refetch ,isError} = useListAllProjectQuery({
    page: currentPage,
    pageSize: itemsPerPage,
    search: debounceSearch,
  });

  useEffect(() => {
    dispatch(toggleRecordingDisableBtn(true));
    return () => {
      dispatch(toggleRecordingDisableBtn(false));
    };
  }, []);


  useEffect(() => { 
    if (data) {
      dispatch(setProjects(data?.results));
    }
  }, [dispatch,data]);

  const handlePageChange = (page: number) => setCurrentPage(page);

  const totalPages = useMemo(
    () => Math.ceil((data?.count || 0) / itemsPerPage),
    [data]
  );
 

  return (
    <>
      {breakPoints === 0 ? (
        <div className='mb-4 flex flex-col sm:flex-row justify-between items-center px-3'>
          <div className='flex gap-4 items-center justify-between w-full sm:w-auto sm:ml-3'>
            <p className='text-2xl font-semibold leading-7'>
              {t('project.project_title')}
            </p>
            <div
              className='border-[1px] px-6 cursor-pointer py-[0.4rem] rounded-md bg-popover text-popover-foreground text-[#9a9a9a]'
              onClick={() => setAddProjectModal((prev) => !prev)}
            >
              <div className='flex gap-4 items-center'>
                <span className='text-[1.1rem]'>
                  {t('project.add_project')}
                </span>
                <span>
                  <Plus size={20} />
                </span>
              </div>
            </div>
          </div>

          <div className='w-full sm:w-[30%] mt-4 sm:mt-0'>
            <div className='rounded-lg mr-4 flex relative'>
              <input
                type='text'
                placeholder={t('project.project_search_placeholder')}
                className='rounded-lg border shadow-md pr-8 pl-10 py-2 w-full bg-popover text-popover-foreground text-[#969696] !outline-none'
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
      ) : (
        <div className='mb-4 flex justify-between items-center'>
          <div className=' flex gap-4 items-center justify-center ml-3'>
            <p className='text-2xl font-semibold leading-7 '>
              {t('project.project_title')}
            </p>
          </div>
          <div
            className='border-[1px]  px-6 cursor-pointer py-[0.4rem] rounded-md bg-popover text-popover-foreground text-[#9a9a9a]'
            onClick={() => setAddProjectModal((prev) => !prev)}
          >
            {
              <div className='flex gap-4 items-center'>
                <span className='text-[1.1rem]'>
                  {t('project.add_project')}
                </span>
                <span>
                  <Plus size={20} />
                </span>
              </div>
            }
          </div>

          <div className='w-[30%]'>
            <div className=' rounded-lg mr-4 flex relative'>
              <input
                type='text'
                placeholder={t('project.project_search_placeholder')}
                className='rounded-lg border shadow-md pr-8 pl-10 py-2 w-[100%] bg-popover text-popover-foreground text-[#969696] !outline-none'
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
      )}
      <div className='mb-4  '>
        {isError ? (
          <FetchError
            refetch={refetch}
            errorText='projects'
          />
        ) : (
          <div>
            {breakPoints === 0 ? (
              <GridProjectView isLoading={isLoading} />
            ) : (
              <ListProjectView isLoading={isLoading} />
              )}
              <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
          </div>
        )}

        
      </div>
      <CreateProjectDialog
        setCreateProjectDialogOpen={setAddProjectModal}
        createProjectDialogOpen={addProjectModal}
      />
    </>
  );
};

export default ListProject;

