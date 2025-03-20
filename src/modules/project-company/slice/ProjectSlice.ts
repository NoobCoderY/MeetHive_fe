import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProject } from '../models';

export interface IProjectState {
  projects: IProject[];
  selectedProject: IProject | null;
}

const initialState: IProjectState = {
  projects: [],
  selectedProject: null,
};

export const projectSlice = createSlice({
  name: 'projectSlice',
  initialState,
  reducers: {
    setProjects(state, action: PayloadAction<IProject[]>) {
      state.projects = action.payload;
    },

    selectProject(state, action: PayloadAction<IProject | null>) {
      state.selectedProject = action.payload;
    },
    updateProject(state, action: PayloadAction<IProject>) {
      const updatedProject = action.payload;
      state.projects = state.projects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      );
      if (state.selectedProject?.id === updatedProject.id) {
        state.selectedProject = updatedProject;
      }
    },
  },
});

export const { setProjects, selectProject } = projectSlice.actions;

export default projectSlice.reducer;
