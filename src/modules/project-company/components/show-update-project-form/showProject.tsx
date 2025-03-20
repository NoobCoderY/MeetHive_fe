import { Button } from '@/shadcn/components/ui/button';
import { Separator } from '@/shadcn/components/ui/separator';
import React from 'react';
import { useTranslations } from 'use-intl';
import { IProject } from '../../models';
import { transformRole } from '../../utils';

interface IShowProjectProps {
  setShowUpdateDialog: React.Dispatch<React.SetStateAction<boolean>>;

  selectedProject: IProject | undefined;
}

const ShowProject = ({
  setShowUpdateDialog,
  selectedProject,
}: IShowProjectProps) => {
  const t = useTranslations();
  return (
    <>
      <div className=''>
        <div className='text-xl font-semibold  basis-[100%]'>
          {t('project.project_details')}
          <Separator className='mt-2 w-[100%] h-[0.1rem]' />
        </div>
        <div className='mt-3'>
          <div className='flex  gap-8 items-center mb-3'>
            <div className='text-sm font-medium basis-[30%] '>
              {t('project.project_name')} :
            </div>
            <div className='text-sm'>{selectedProject?.name}</div>
          </div>
          <div className='flex  gap-10  mb-3'>
            <div className='text-sm font-medium basis-[30%]'>
              {t('project.project_description')} :
            </div>
            <div className='text-sm w-[65%] max-h-[26vh] overflow-scroll'>
              {selectedProject?.description}
            </div>
          </div>
          <div className='flex  gap-8 items-center mb-3'>
            <div className='text-sm font-medium basis-[30%]'>
              {t('project.status')} :
            </div>
            <div className='text-sm'>{selectedProject?.status}</div>
          </div>
          <div className='flex gap-8 items-center mb-3'>
            <div className='text-sm font-medium basis-[30%]'>
              {t('project.company')} :
            </div>
            <div className='text-sm'>{selectedProject?.company?.name}</div>
          </div>
          <div className='flex  gap-8 items-center mb-3'>
            <div className='text-sm font-medium  basis-[30%]'>
              {t('project.role')} :
            </div>
            <div className='text-sm'>
              {transformRole(selectedProject?.users[0].role.name as string)}
            </div>
          </div>
          <Separator className='mt-2 w-[100%] h-[0.1rem]' />
        </div>
        <div className='flex justify-end'>
          <Button
            type='submit'
            className='mt-3 text-sm'
            onClick={() => setShowUpdateDialog((prev) => !prev)}
          >
            {t('project.update_project')}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ShowProject;
