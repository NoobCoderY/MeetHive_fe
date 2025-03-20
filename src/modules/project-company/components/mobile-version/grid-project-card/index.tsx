import { Button } from '@/shadcn/components/ui/button';
import './index.css';
import { IProject } from '@/modules/project-company/models';
import { useTranslations } from 'use-intl';
import { transformRole } from '@/modules/project-company/utils';
import { useTheme } from '@/modules/core/contexts/theme-provider';
import { Toggle } from '@/shadcn/components/ui/toggle';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectProject } from '@/modules/project-company/slice/ProjectSlice';
import project_icon from '../../../../../assets/icons/project_icon.svg';
interface IGridProjectCard {
  handleShowUpdateModal: (project: any) => void;
  project: IProject;
  setProjectName: React.Dispatch<React.SetStateAction<string>>;
  setProjectTitleDescriptionDialogOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  viewProject: number;
  setViewProject: React.Dispatch<React.SetStateAction<number>>;
}

const GridProjectCard = ({
  handleShowUpdateModal,
  project,
  setProjectName,
  setProjectTitleDescriptionDialogOpen,
  viewProject,
  setViewProject,
}: IGridProjectCard) => {
  const t = useTranslations();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectAndRedirectToTranscriptionPage = (project: IProject) => {
    dispatch(selectProject(project));
    navigate('/transcription');
  };

  return (
    <>
      <div className='transcription_card'>
        <div className='container-card bg-green-box'>
          <div className='flex justify-between items-center'>
            <div className='flex  items-center gap-[2rem]'>
              <img
                src={project_icon}
                alt='project_icon'
              />

              <div className='pr-5'>
                <p
                  className='font-bold text-lg'
                  onClick={() => {
                    setProjectName(project.name);
                    setProjectTitleDescriptionDialogOpen((prev) => !prev);
                  }}
                >
                  {' '}
                  {project.name.length > 9
                    ? `${project.name.slice(0, 15)} ...`
                    : project.name}
                </p>
              </div>
            </div>
            <div className=' pr-4 '>
              <h1
                className={`font-semibold ${
                  project.status === 'ACTIVE'
                    ? `${
                        theme === 'light' ? 'text-[#4ba54b]' : 'text-[#a6efa6]'
                      }`
                    : 'text-[#f44040]'
                }`}
              >
                {project.status}
              </h1>
            </div>
          </div>
          <div className='mt-3 flex flex-col gap-2'>
            <div className='flex gap-5 font-semibold'>
              <p className='basis-[45%]'>{t('project.company')} :</p>
              <p>{project?.company?.name}</p>
            </div>
            <div className='flex gap-5 font-semibold'>
              <p className='basis-[45%] '>{t('project.role')} : </p>
              <p>{transformRole(project.users[0].role.name as string)}</p>
            </div>
          </div>
          <div className='flex justify-end pr-3 mt-5 font-bold'>
            <Button
              onClick={() => {
                handleShowUpdateModal(project);
              }}
            >
              {t('project.view_project')}
            </Button>
            <Toggle
              aria-label='Toggle bold'
              className='rounded-[50%] ml-4 w-[45px] !h-[45px]'
              onPressedChange={() => {
                setViewProject((prev) =>
                  prev === viewProject ? -1 : viewProject
                );
                selectAndRedirectToTranscriptionPage(project);
              }}
            >
              <ArrowRight className='h-10 w-10' />
            </Toggle>
          </div>
        </div>
      </div>
    </>
  );
};

export default GridProjectCard;
