import React, { ChangeEvent, useEffect, useState } from 'react';
import { FolderKanban } from 'lucide-react';
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shadcn/components/ui/card';

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
      setCreateProjectDialogOpen(false);
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

  return (
    <Dialog
      open={createProjectDialogOpen}
      onOpenChange={setCreateProjectDialogOpen}
    >
      <DialogContent className='glass-panel max-h-[min(90vh,720px)] overflow-y-auto border-primary/25 shadow-glow-md sm:max-w-[480px]'>
        <DialogHeader className='space-y-2 text-left'>
          <div className='flex items-center gap-2'>
            <span className='rounded-lg border border-primary/25 bg-primary/10 p-2'>
              <FolderKanban className='h-5 w-5 text-primary' />
            </span>
            <div>
              <DialogTitle className='text-xl font-bold tracking-tight md:text-2xl'>
                {t('project.project_create')}
              </DialogTitle>
              <DialogDescription className='text-sm text-muted-foreground'>
                Name your project and add a short description. You can change this later.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className='grid gap-5 py-2'>
          <div className='flex flex-col gap-2'>
            <Label
              htmlFor='projectName'
              className='text-sm font-medium text-foreground'
            >
              {t('project.project_name')}
            </Label>
            <Input
              id='projectName'
              className='h-11 rounded-xl border-border/80 bg-background/60'
              value={formState.projectName}
              onChange={handleInputChange}
              placeholder={t('project.project_name')}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label
              htmlFor='description'
              className='text-sm font-medium text-foreground'
            >
              {t('project.project_description')}
            </Label>
            <Textarea
              placeholder='Describe what this project is for…'
              id='description'
              rows={5}
              value={formState.description}
              onChange={handleInputChange}
              className='min-h-[120px] rounded-xl border-border/80 bg-background/60'
            />
          </div>
        </div>
        <DialogFooter className='gap-2 sm:justify-end'>
          <Button
            type='button'
            variant='outline'
            className='rounded-xl border-border/70'
            onClick={() => setCreateProjectDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            className='rounded-xl shadow-glow-sm'
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
    <div className='flex min-h-[calc(100dvh-8rem)] flex-col items-center justify-center px-4 py-12'>
      <Card className='glass-panel w-full max-w-md border-primary/20 shadow-glow-sm'>
        <CardHeader className='space-y-2 text-center'>
          <div className='mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 shadow-inner-glow'>
            <FolderKanban className='h-7 w-7 text-primary' />
          </div>
          <CardTitle className='text-balance text-2xl font-bold tracking-tight'>
            {t('project.default_project_create_title')}
          </CardTitle>
          <CardDescription className='text-base'>
            {t('project.default_project_create_btn')}
          </CardDescription>
        </CardHeader>
        <CardContent className='flex justify-center pb-8'>
          <button
            type='button'
            onClick={() => setCreateProjectDialogOpen(true)}
            className='group flex flex-col items-center gap-3 rounded-2xl border border-dashed border-primary/35 bg-primary/[0.06] px-10 py-8 transition-all duration-300 hover:border-primary/55 hover:bg-primary/10 hover:shadow-glow-sm'
          >
            <span className='rounded-full border border-primary/40 bg-background/80 p-5 transition-transform duration-300 group-hover:scale-105'>
              <FolderKanban
                className='h-10 w-10 text-primary'
                strokeWidth={1.5}
              />
            </span>
            <span className='text-sm font-semibold text-primary'>
              Open project form
            </span>
          </button>
        </CardContent>
      </Card>
      <CreateProjectDialog
        createProjectDialogOpen={createProjectDialogOpen}
        setCreateProjectDialogOpen={setCreateProjectDialogOpen}
      />
    </div>
  );
};

export default ProjectForm;
