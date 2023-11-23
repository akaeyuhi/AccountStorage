import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import accountSlice from '../features/account/accountSlice';
import AuthService from '../services/AuthService';

const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:4000/';

const authService = new AuthService(baseURL + 'auth');

export const store = configureStore({
  reducer: {
    account: accountSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { authService },
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
