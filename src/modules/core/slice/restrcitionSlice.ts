import { createSlice } from '@reduxjs/toolkit';


const TRANSLIMIT_IN_MINUTES = import.meta.env.VITE_TRANSLIMIT_IN_MINUTES;

const initialState = {
  transcriptionRestrictionTime: 0,
  month: 0,
  remainingUsedSecond: 0,
};

export const restrictionSlice = createSlice({
  name: 'restriction',
  initialState,
  reducers: {
    setTranscriptionRestriction: (state, action) => {
      state.transcriptionRestrictionTime =
        action.payload.transcriptionRestrictionTime;
      state.month = action.payload.month;
          const usedSeconds = action.payload.transcriptionRestrictionTime;
          const remainingSec = TRANSLIMIT_IN_MINUTES * 60 - usedSeconds;
          state.remainingUsedSecond=remainingSec>0 ?remainingSec:0
    },
  },
});

export const { setTranscriptionRestriction } = restrictionSlice.actions;

export default restrictionSlice.reducer;
