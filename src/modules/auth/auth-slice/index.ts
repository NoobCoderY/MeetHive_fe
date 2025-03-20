import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthResponse } from '../models';
import { redirect } from 'react-router-dom';

const initialState: IAuthResponse = {
  user: null,
  token: null,
};


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IAuthResponse>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      redirect('/');
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      redirect('/login');
    },
  },
});

export const { setUser,logout} = authSlice.actions;

export default authSlice.reducer;
