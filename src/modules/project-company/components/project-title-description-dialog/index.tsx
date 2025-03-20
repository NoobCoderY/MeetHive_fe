import {
  Dialog,
  DialogContent,
  DialogHeader,
} from '@/shadcn/components/ui/dialog';
import React from 'react';
import { useTranslations } from 'use-intl';

const ProjectTitleDescriptionDialog = ({
  projectTitleDescriptionDialogOpen,
  setProjectTitleDescriptionDialogOpen,
  projectName,
}: {
  projectTitleDescriptionDialogOpen: boolean;
  setProjectTitleDescriptionDialogOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  projectName: string;
}) => {
  const t = useTranslations();
  return (
    <Dialog
      open={projectTitleDescriptionDialogOpen}
      onOpenChange={setProjectTitleDescriptionDialogOpen}
    >
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader className='flex  justify-center items-center'>
          <div className='text-2xl relative'>
            {t('project.project_title_name')}
            <div className='absolute bottom-[-0.25rem] left-0 w-full h-[1px] bg-[#fff]'></div>
          </div>
        </DialogHeader>
        <div className='text-lg truncate text-wrap break-words mt-2 max-w-full p-l-10'>
          {projectName}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectTitleDescriptionDialog;
