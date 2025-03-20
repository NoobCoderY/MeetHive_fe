import React, { ChangeEvent, useEffect, useState } from 'react';
import { FolderOpenDot } from 'lucide-react';
import { Button } from '@/shadcn/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/shadcn/components/ui/dialog';
import { Input } from '@/shadcn/components/ui/input';
import { Label } from '@/shadcn/components/ui/label';
import { Textarea } from '@/shadcn/components/ui/textarea';
import { useToast } from '@/shadcn/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useTranslations } from 'use-intl';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectProject } from '../../slice/ProjectSlice';
import { useCreateProjectMutation } from '../../services/projectApi';

interface ProjectForm {
  setSelectCompanyForm: React.Dispatch<React.SetStateAction<number>>;
  setCompanyRegistrationFormFieldsState: React.Dispatch<
    React.SetStateAction<
      {
        profession: {
          value: string;
          marked: boolean;
        }[];
        interests: {
          value: string;
          marked: boolean;
        }[];
      }[]
    >
  >;
  companyRegistrationFormFieldsState: {
    profession: {
      value: string;
      marked: boolean;
    }[];
    interests: {
      value: string;
      marked: boolean;
    }[];
  }[];
}

// Define your paths
const pathOne = '/project';

export function CreateProjectDialog({
  setCreateProjectDialogOpen,
  createProjectDialogOpen,
}: {
  createProjectDialogOpen: boolean;
  setCreateProjectDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const t = useTranslations();
  const [formState, setFormState] = useState({
    projectName: '',
    description: '',
  });

  const location = useLocation();

  const dispatch = useDispatch();

  const [createProject, { isSuccess, isError, isLoading, data }] =
    useCreateProjectMutation();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const submitForm = () => {
    if (!formState.projectName || !formState.description) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: t('project.project_name_des_required'),
      });
      return;
    }
    createProject({
      name: formState.projectName,
      description: formState.description,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Success',
        description: t('project.project_create_success'),
      });
      handleDialogClose();
      setFormState({
        projectName: '',
        description: '',
      });

      if (location.pathname !== pathOne) {
        dispatch(selectProject(data?.data));
        navigate('/dashboard');
      }
    }

    if (isError) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: t('project.project_create_failed'),
      });
    }
  }, [isError, isSuccess]);

  const handleDialogClose = () => {
    setCreateProjectDialogOpen((prev) => !prev);
  };

  return (
    <Dialog
      open={createProjectDialogOpen}
      onOpenChange={handleDialogClose}
    >
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader className='flex items-center justify-center'>
          <DialogTitle className='text-2xl relative'>
            {t('project.project_create')}
            <div className='absolute bottom-[-0.25rem] left-0 w-full h-[1px] bg-[#fff]'></div>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
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
          <div className='flex flex-col gap-2'>
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
        <DialogFooter>
          <Button
            type='submit'
            onClick={submitForm}
          >
            {isLoading && <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />}
            {t('project.add_project')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const ProjectForm = () => {
  const [createProjectDialogOpen, setCreateProjectDialogOpen] = useState(false);
  const t = useTranslations();
  return (
    <div className='flex justify-center items-center h-[80vh] flex-col'>
      <p className='text-2xl font-bold mb-5'>
        {t('project.default_project_create_title')}
      </p>
      <div className='px-2 py-3 pb-4 border-[1px] border-[#fff] flex justify-center items-center sm:w-[30vw] lg:w-[20vw] w-[60vw] flex-col gap-5 rounded-lg'>
        <p className='text-xl font-bold'>
          {t('project.default_project_create_btn')}
        </p>
        <div
          className='rounded-[50%] border-[1px] border-[#fff] p-4 cursor-pointer'
          onClick={() => setCreateProjectDialogOpen((prev) => !prev)}
        >
          <span>
            <FolderOpenDot size={30} />
          </span>
        </div>
      </div>
      <CreateProjectDialog
        createProjectDialogOpen={createProjectDialogOpen}
        setCreateProjectDialogOpen={setCreateProjectDialogOpen}
      />
    </div>
  );
};

export default ProjectForm;
