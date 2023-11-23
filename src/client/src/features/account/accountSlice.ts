import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser } from './actions/loginUser';
import { AuthState } from './types/AuthState';
import { AuthResponse } from './types/AuthResponse';

const storageNames = {
  user: 'loginUser',
  token: 'loginToken',
};

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem(storageNames.user) ?? 'null'),
  token: localStorage.getItem(storageNames.token),
  loading: false,
  error: null,
};

const isRejectedAction = (action: Action) => action.type.endsWith('rejected');
const isPendingAction = (action: Action) => action.type.endsWith('pending');

const saveUser = (state: AuthState, action: PayloadAction<AuthResponse>) => {
  state.loading = false;
  state.token = action.payload.accessToken;
  localStorage.setItem(storageNames.token, state.token as string);
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    logout(state: AuthState) {
      state.token = null;
      localStorage.removeItem(storageNames.user);
      localStorage.removeItem(storageNames.token);
    },
  },
  extraReducers: builder => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      saveUser(state, action);
    });
    builder.addMatcher(isRejectedAction, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addMatcher(isPendingAction, state => {
      state.loading = true;
      state.error = null;
    });
  },
});

export const { logout } = accountSlice.actions;
export default accountSlice.reducer;
