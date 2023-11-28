import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../services/AuthService';
import { AppDispatch, RootState } from './store';
import UserService from 'services/UserService';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
  extra: { authService: AuthService, userService: UserService };
}>();
