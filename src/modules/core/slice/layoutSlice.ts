import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

interface ILayout {
  recordingDisableBtn: boolean;
}

const initialState: ILayout = {
  recordingDisableBtn: false,
};

const layoutSLice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    toggleRecordingDisableBtn(state, actions: PayloadAction<boolean>) {
      state.recordingDisableBtn = actions.payload;
    },
  },
});

export const { toggleRecordingDisableBtn } = layoutSLice.actions;
export default layoutSLice.reducer;
