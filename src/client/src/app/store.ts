import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import accountSlice from '../features/account/accountSlice';
import AuthService from '../services/AuthService';
import userSlice from 'features/user/userSlice';
import UserService from 'services/UserService';

const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000/api/';

const authService = new AuthService(baseURL + 'auth');
const userService = new UserService(baseURL + 'user');
export const store = configureStore({
  reducer: {
    account: accountSlice,
    user: userSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { authService, userService },
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
