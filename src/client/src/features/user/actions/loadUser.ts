import { createAppAsyncThunk } from 'app/createAsyncThunk';
import { User } from 'services/interfaces/User';
import { UserStoreError } from 'features/user/types/UserStoreError';

export const loadUser = createAppAsyncThunk<
  User,
  number,
  { rejectValue: UserStoreError }
>('user/load', async (id: number, { rejectWithValue, extra }) => {
  try {
    const response = await extra.userService.getUser(id);
    if ((response as any).message) {
      return rejectWithValue((response as any).message);
    }
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message ?? error.message);
  }
});
