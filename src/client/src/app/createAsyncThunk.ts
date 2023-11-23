import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../services/AuthService';
import { AppDispatch, RootState } from './store';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
  extra: { authService: AuthService };
}>();
