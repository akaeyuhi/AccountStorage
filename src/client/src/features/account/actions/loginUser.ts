import { createAppAsyncThunk } from 'app/createAsyncThunk';
import { AuthStoreError } from '../types/AuthError';
import { AuthResponse } from '../types/AuthResponse';
import { LoginDto } from 'services/interfaces/LoginDto';

export const loginUser = createAppAsyncThunk<
  AuthResponse,
  LoginDto,
  { rejectValue: AuthStoreError }
>('account/login', async (dto: LoginDto, { rejectWithValue, extra }) => {
  try {
    const response = await extra.authService.login(dto);
    if ((response as any).message) {
      return rejectWithValue((response as any).message);
    }
    if (!extra.userService.token) extra.userService.setToken(response.accessToken);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message ?? error.message);
  }
});
