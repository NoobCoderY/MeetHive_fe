import { Input } from '@/shadcn/components/ui/input';
import { Label } from '@/shadcn/components/ui/label';
import { Textarea } from '@/shadcn/components/ui/textarea';
import { useState, useEffect, ChangeEvent } from 'react';
import { Button } from '@/shadcn/components/ui/button';
import { useUpdateProjectMutation } from '../../services/projectApi';
import { useToast } from '@/shadcn/components/ui/use-toast';
import { useTranslations } from 'use-intl';
import { ReloadIcon } from '@radix-ui/react-icons';
import { IProject } from '../../models';
import { useDispatch } from 'react-redux';
import { selectProject } from '../../slice/ProjectSlice';

interface IUpdateProjectProps {
  setShowUpdateProjectDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowUpdatedialog: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProject: IProject | undefined;
}

const UpdateProject = ({
  setShowUpdateProjectDialogOpen,
  setShowUpdatedialog,
  selectedProject,
}: IUpdateProjectProps) => {
  const [formState, setFormState] = useState({
    projectName: '',
    description: '',
  });

  const { toast } = useToast();
  const t = useTranslations();
  const dispatch = useDispatch();

  const [updateProject, { isSuccess, isError, isLoading, data }] =
    useUpdateProjectMutation();

  const submitForm = () => {
    updateProject({
      name: formState.projectName,
      description: formState.description,
    });
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  useEffect(() => {
    setFormState({
      projectName: selectedProject?.name || '',
      description: selectedProject?.description || '',
    });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Success',
        description: t('project.project_update_success'),
      });
      dispatch(selectProject(data?.data));
      setShowUpdatedialog((prev) => !prev);
      setShowUpdateProjectDialogOpen((prev) => !prev);
    }

    if (isError) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: t('project.project_update_failed'),
      });
    }
  }, [isError, isSuccess]);

  return (
    <>
      <div className='flex justify-center items-center flex-col'>
        <div className='text-2xl relative'>
          {t('project.update_project')}
          <div className='absolute bottom-[-0.25rem] left-0 w-full h-[1px] bg-[#fff]'></div>
        </div>
        <div className='w-[100%] mt-3'>
          <div className='flex flex-col gap-2'>
            <Label
              htmlFor='projectName'
              className='ml-2 text-md'
            >
              {t('project.project_name')}
            </Label>
            <Input
              id='projectName'
              className='col-span-3'
              value={formState.projectName}
              onChange={handleInputChange}
            />
          </div>
          <div className='flex flex-col gap-2 mt-4'>
            <Label
              htmlFor='description'
              className='ml-2 text-md'
            >
              {t('project.project_description')}
            </Label>
            <Textarea
              placeholder='Type your Project Description here.'
              id='description'
              rows={5}
              value={formState.description}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className='mt-3 flex justify-end w-[100%]'>
          <Button
            className='mr-2'
            onClick={() => submitForm()}
          >
            {isLoading && <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />}
            {t('project.update_project')}
          </Button>
        </div>
      </div>
    </>
  );
};

export default UpdateProject;
