import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent } from '@/shadcn/components/ui/card';
import { useTranslations } from 'use-intl';
import { useListAllProjectQuery } from '../../services/projectApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { IProject } from '../../models';
import { FolderLock } from 'lucide-react';
import { Separator } from '@/shadcn/components/ui/separator';
import { setProjects, selectProject } from '../../slice/ProjectSlice';
import { useDispatch } from 'react-redux';
import { LoadingSpinner } from '@/shadcn/components/shared/loader';
import { useNavigate } from 'react-router-dom';
import './index.css';
import FetchError from '@/shadcn/components/shared/fetch-error';
import { CustomPagination } from '@/shadcn/components/shared/custom-pagination';

const itemsPerPage = 6;

const SelectProject = () => {
  const t = useTranslations();
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const company = useSelector(
    (state: RootState) => state.company.selectedCompany
  );
  const dispatch = useDispatch();

  const { data, isLoading, refetch, isError } = useListAllProjectQuery({
    page: currentPage,
    pageSize: itemsPerPage,
    search: '',
  });

  const projects = useSelector((state: RootState) => state.project.projects);


  useEffect(() => {
    if (data) {
      if (data.results.length === 1) {
        dispatch(selectProject(data.results[0]));
        navigate('/dashboard');
      } else {
        dispatch(setProjects(data.results));
      }
    }
  }, [data]);

   const handleSelectProject = (project: IProject, index: number) => {
     if (project) {
       setSelectedIndex(index);
       dispatch(selectProject(project));
       navigate('/dashboard');
     }
   };

  const handlePageChange = (page: number) => setCurrentPage(page);

  const totalPages = useMemo(
    () => Math.ceil((data?.count || 0) / itemsPerPage),
    [data]
  );

  if (isLoading)
    return (
      <div className='flex justify-center items-center h-[60vh]'>
        <LoadingSpinner />
      </div>
    );


  return (
    <div className='flex items-center justify-center px-4 flex-col'>
      <Card className='w-[100%] h-[24vh]  flex justify-center items-center glassmorphism'>
        <CardContent className='flex justify-center items-center flex-col gap-2  mt-5'>
          <div className='text-2xl font-semibold '>
            {t('project.project_select')}
          </div>
          <div className='text-xl text-center font-semibold'>
            {company?.name}
          </div>
        </CardContent>
      </Card>
      <div className='mt-8 w-[100%] flex flex-col gap-6'>
        {isError ? (
          <FetchError
            refetch={refetch}
            errorText={t('project.project_select')}
          />
        ) : (
          <div>
            {projects?.map((project: IProject, index: number) => {
              return (
                <div
                  key={project.id}
                  className='mb-4'
                >
                  <div
                    className={`px-3 py-5  flex items-center gap-4 cursor-pointer select_project_card ${
                      selectedIndex === index
                        ? 'bg-[#1F1F1F] border-[1px] border-[#22C55E]'
                        : ''
                    } `}
                    onClick={() => handleSelectProject(project, index)}
                  >
                    <div className='flex justify-center rounded-lg items-center sm:w-[4%] sm:min-h-12 lg:w-[4%] lg:min-h-12 w-[14%] min-h-12 border-[1px] border-[gray]'>
                      <span>
                        <FolderLock size={30} />
                      </span>
                    </div>
                    <div className='flex flex-col text-[14px]'>
                      <span>{project?.name}</span>
                      <span>{project?.company?.name}</span>
                    </div>
                  </div>
                  {index < projects.length - 1 && <Separator />}
                </div>
              );
            })}
            <div className='mt-4'>
              <CustomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectProject;
