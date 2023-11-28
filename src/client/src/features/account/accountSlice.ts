import { createSlice, isPending, isRejected, PayloadAction } from '@reduxjs/toolkit';
import { loginUser } from './actions/loginUser';
import { AuthState } from './types/AuthState';
import { AuthResponse } from './types/AuthResponse';
import { registerUser } from 'features/account/actions/registerUser';

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

const isRejectedAction = () => isRejected(loginUser, registerUser);
const isPendingAction = () => isPending(loginUser, registerUser);

const saveUser = (state: AuthState, action: PayloadAction<AuthResponse>) => {
  state.loading = false;
  state.token = action.payload.accessToken;
  state.user = action.payload.user;
  localStorage.setItem(storageNames.token, state.token as string);
  localStorage.setItem(storageNames.user, JSON.stringify(state.user));
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    logout(state: AuthState) {
      state.token = null;
      state.user = null;
      localStorage.removeItem(storageNames.user);
      localStorage.removeItem(storageNames.token);
    },
  },
  extraReducers: builder => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      saveUser(state, action);
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      saveUser(state, action);
    });
    builder.addMatcher(isRejectedAction(), (state, action) => {
      state.loading = false;
      state.error = action.payload ?? new Error('Internal server error. Try again later.');
    });
    builder.addMatcher(isPendingAction(), state => {
      state.loading = true;
      state.error = null;
    });
  },
});

export const { logout } = accountSlice.actions;
export default accountSlice.reducer;
