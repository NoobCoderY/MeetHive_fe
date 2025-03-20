import { useState } from 'react';
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/shadcn/components/ui/table';
import { FolderGit2 } from 'lucide-react';
import ShowUpdateProjectDialog from '../show-update-project-form';
import { Button } from '@/shadcn/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { IProject } from '../../models';
import { useTranslations } from 'use-intl';
import ProjectTitleDescriptionDialog from '../project-title-description-dialog';
import { transformRole } from '../../utils';
import { Toggle } from '@/shadcn/components/ui/toggle';
import { ArrowRight } from 'lucide-react';
import { selectProject } from '../../slice/ProjectSlice';
import { useNavigate } from 'react-router-dom';
import SkeletonLoader from '@/shadcn/components/shared/skelton-loader';


const ListMeetingView = ({  isLoading }: { isLoading:boolean }) => {
  const [showUpdateProjectDialogOpen, setShowUpdateProjectDialogOpen] =useState(false);
  const [viewProject, setViewProject] = useState<number>(-1);
  const [showUpdateDialog, setShowUpdateDialog] = useState(true);
  const [ projectTitleDescriptionDialogOpen, setProjectTitleDescriptionDialogOpen,] = useState(false);
  const [projectName, setProjectName] = useState<string>('');
  const projects = useSelector((state: RootState) => state.project.projects);
  const t = useTranslations();
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const handleShowUpdateModal = (project: any) => {
   dispatch(selectProject(project));
    setShowUpdateProjectDialogOpen((prev) => !prev);
  };

  /**
   * Filters projects based on the search term.
   * @param projects - Array of IProject objects.
   * @param searchTerm - Term to search for in project names.
   * @returns Filtered array of IProject objects.
   */
 

  const selectAndRedirectToTranscriptionPage = (project: IProject) => {
    dispatch(selectProject(project));
    Navigate('/transcription');
  };

 
   if (isLoading ) {
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
    <div className='p-4 md:p-6 lg:p-8'>
      <>
        <div className='overflow-x-auto '>
          <Table className='min-w-full'>
            <TableHeader>
              <TableRow className='hover:bg-transparent'>
                <TableHead className='whitespace-nowrap'>
                  {t('project.project')}
                </TableHead>
                <TableHead className='whitespace-nowrap'>
                  {t('project.company')}
                </TableHead>
                <TableHead className='text-center whitespace-nowrap'>
                  {t('project.status')}
                </TableHead>
                <TableHead className='text-center whitespace-nowrap'>
                  {t('project.role')}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects?.map((project, index) => (
                <TableRow
                  key={`${project?.id}+${index + 2}`}
                  className='cursor-pointer '
                >
                  <TableCell className='font-medium h-[5vh] sm:h-[3vh] '>
                    <div className='flex items-center gap-3'>
                      <span className='flex w-[20px] h-[20px] items-center'>
                        <FolderGit2 />
                      </span>
                      <span
                        className='ml-3 cursor-pointer'
                        onClick={() => {
                          setProjectName(project.name);
                          setProjectTitleDescriptionDialogOpen((prev) => !prev);
                        }}
                      >
                        {project.name.length > 9
                          ? `${project.name.slice(0, 9)} ...`
                          : project.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{project?.company?.name}</TableCell>
                  <TableCell className='text-center'>
                    {project.status}
                  </TableCell>
                  <TableCell className='text-center'>
                    {transformRole(project.users[0]?.role?.name as string)}
                  </TableCell>
                  <TableCell className='text-right'>
                    <Button
                      className='cursor-pointer mr-4'
                      onClick={() => {
                        handleShowUpdateModal(project);
                      }}
                    >
                      {t('project.view_project')}
                    </Button>

                    <Toggle
                      aria-label='Toggle bold'
                      pressed={viewProject === index}
                      className='rounded-[50%] ml-4 w-[45px] !h-[45px]'
                      onPressedChange={() => {
                        setViewProject((prev) => (prev === index ? -1 : index));
                        selectAndRedirectToTranscriptionPage(project);
                      }}
                    >
                      <ArrowRight className='h-4 w-4' />
                    </Toggle>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </>
      <ShowUpdateProjectDialog
        showUpdateProjectDialogOpen={showUpdateProjectDialogOpen}
        setShowUpdateProjectDialogOpen={setShowUpdateProjectDialogOpen}
        showUpdatedialog={showUpdateDialog}
        setShowUpdatedialog={setShowUpdateDialog}
      />
      <ProjectTitleDescriptionDialog
        projectTitleDescriptionDialogOpen={projectTitleDescriptionDialogOpen}
        setProjectTitleDescriptionDialogOpen={
          setProjectTitleDescriptionDialogOpen
        }
        projectName={projectName}
      />
    </div>
  );
};
export default ListMeetingView;
