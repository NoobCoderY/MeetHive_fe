import { createSlice } from '@reduxjs/toolkit';
import { SummaryItem } from '../model';

export interface ISummaryState {
  allSummary: SummaryItem[];
  selectedSummary: SummaryItem | null;
}

const initialState: ISummaryState = {
  allSummary: [],
  selectedSummary: null,
};

export const summarySlice = createSlice({
  name: 'summarySlice',
  initialState,
  reducers: {
    setAllSummary(state, action) {
      state.allSummary = [...action.payload];
    },
    selectedSummary(state, action) {
      state.selectedSummary = action.payload;
    },
  },
});

export const { setAllSummary, selectedSummary } = summarySlice.actions;

export default summarySlice.reducer;
