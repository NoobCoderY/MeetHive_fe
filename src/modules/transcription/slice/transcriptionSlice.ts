import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SpeakerTranscription } from '../models';
import { ITranscription } from '../models';

export interface ITranscriptionState {
  currentTranscription: SpeakerTranscription;
  recordingPermission: boolean;
  allTranscription: ITranscription[];
  selectedTranscription: ITranscription | null;
}

const initialState: ITranscriptionState = {
  currentTranscription: {
    content: [],
    endTime: 0,
  },
  recordingPermission: false,
  allTranscription: [],
  selectedTranscription: null,
};

export const transcriptionSlice = createSlice({
  name: 'transcriptSlice',
  initialState,
  reducers: {
    setCurrentTranscription(
      state,
      action: PayloadAction<{
        content: Array<{ speaker: string; speech: string; startTime: number }>;
        endTime: number;
      }>
    ) {
      state.currentTranscription = {...action.payload};
    },
    setRecordingPermission(state, action: PayloadAction<boolean>) {
      state.recordingPermission = action.payload;
    },
    clearTanscription(state) {
      state.currentTranscription.content = [];
    },
    setAllTranscription(state, action: PayloadAction<ITranscription[]>) {
      state.allTranscription = [...action.payload];
    },
    selectedTranscription(state, action: PayloadAction<ITranscription>) {
      state.selectedTranscription = action.payload;
    },
  },
});

export const {
  setCurrentTranscription,
  setRecordingPermission,
  clearTanscription,
  setAllTranscription,
  selectedTranscription,
} = transcriptionSlice.actions;

export default transcriptionSlice.reducer;
