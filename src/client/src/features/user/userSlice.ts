import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import { UserState } from 'features/user/types/UserState';
import { loadUser } from 'features/user/actions/loadUser';

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const isRejectedAction = () => isRejected(loadUser);
const isPendingAction = () => isPending(loadUser);

const accountSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
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
export default accountSlice.reducer;
