import React from 'react';
import UpdateProject from './updateProject';
import ShowProject from './showProject';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shadcn/components/ui/dialog';
import { RootState } from '@/store/store';
import { useSelector} from 'react-redux';

interface IShowUpdateProjectDialog {
  showUpdateProjectDialogOpen: boolean;
  setShowUpdateProjectDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowUpdatedialog: React.Dispatch<React.SetStateAction<boolean>>;
  showUpdatedialog: boolean;
}

const ShowUpdateProjectDialog = ({
  showUpdateProjectDialogOpen,
  setShowUpdateProjectDialogOpen,
  setShowUpdatedialog,
  showUpdatedialog,
}: IShowUpdateProjectDialog) => {
  const selectedProject = useSelector(
    (state: RootState) => state.project.selectedProject
  );
  const handleDialogClose = () => {
    setShowUpdateProjectDialogOpen((prev) => !prev);
  };
  return (
    <Dialog
      open={showUpdateProjectDialogOpen}
      onOpenChange={handleDialogClose}
    >
      <DialogHeader>
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <DialogContent className='sm:max-w-[425px]'>
        {showUpdatedialog ? (
          <ShowProject
            setShowUpdateDialog={setShowUpdatedialog}
            selectedProject={selectedProject}
          />
        ) : (
          <UpdateProject
            setShowUpdatedialog={setShowUpdatedialog}
            selectedProject={selectedProject}
            setShowUpdateProjectDialogOpen={setShowUpdateProjectDialogOpen}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ShowUpdateProjectDialog;
