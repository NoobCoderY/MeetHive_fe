import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICompany } from '../models';

export interface ICompanyState {
  companies: ICompany[];
  selectedCompany: ICompany | null;
}

const initialState: ICompanyState = {
  companies: [],
  selectedCompany: null,
};

export const companySlice = createSlice({
  name: 'companySlice',
  initialState,
  reducers: {
    setCompanies(state, action: PayloadAction<ICompany[]>) {
      state.companies = action.payload;
    },
    
    selectCompany(state, action: PayloadAction<ICompany | null>) {
      state.selectedCompany = action.payload;
    },
  },
});

export const { setCompanies, selectCompany } = companySlice.actions;

export default companySlice.reducer;
