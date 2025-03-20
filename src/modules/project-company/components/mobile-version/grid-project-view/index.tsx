import {useState} from 'react'
import GridProjectCard from '../grid-project-card';
import ProjectTitleDescriptionDialog from '../../project-title-description-dialog';
import ShowUpdateProjectDialog from '../../show-update-project-form';
import { IProject } from '@/modules/project-company/models';
import {  useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import SkeletonLoader from '@/shadcn/components/shared/skelton-loader';

const GridProjectView = ({ isLoading }: {isLoading:boolean }) => {
   const [showUpdateProjectDialogOpen, setShowUpdateProjectDialogOpen] =
     useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(true);
  const [
    projectTitleDescriptionDialogOpen,
    setProjectTitleDescriptionDialogOpen,
  ] = useState(false);
  const [projectName, setProjectName] = useState<string>('');
  const projects = useSelector((state: RootState) => state.project.projects);
  const [selectedProject, setSelectedProject] = useState<IProject>()
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const [viewProject,setViewProject] = useState<number>(-1);
  

  const handleShowUpdateModal = (project: any) => {
    setSelectedProject(project)
    setShowUpdateProjectDialogOpen((prev) => !prev);
  };

  /**
   * Filters projects based on the search term.
   * @param projects - Array of IProject objects.
   * @param searchTerm - Term to search for in project names.
   * @returns Filtered array of IProject objects.
   */
 



  if (isLoading ) {
    return (
      <SkeletonLoader
        count={6}
        height='h-[200px]'
        width='w-[350px]'
      />
    );
  }

  return (
    <div className='flex  flex-wrap px-3 pb-6 gap-10'>
      {projects.map((project,index) => (
        <GridProjectCard
          key={project?.id}
          handleShowUpdateModal={handleShowUpdateModal}
          project={project}
          setProjectName={setProjectName}
          setProjectTitleDescriptionDialogOpen={setProjectTitleDescriptionDialogOpen}
          viewProject={index}
          setViewProject={setViewProject}


        />
      ))}
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

export default GridProjectView