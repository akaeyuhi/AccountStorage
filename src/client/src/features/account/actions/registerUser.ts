import { createAppAsyncThunk } from 'app/createAsyncThunk';
import { AuthStoreError } from '../types/AuthError';
import { AuthResponse } from '../types/AuthResponse';
import { RegisterDto } from "services/interfaces/RegisterDto";

export const registerUser = createAppAsyncThunk<
  AuthResponse,
  RegisterDto,
  { rejectValue: AuthStoreError }
>('account/register', async (dto: RegisterDto, { rejectWithValue, extra }) => {
  try {
    const response = await extra.authService.register(dto);
    if ((response as any).message) {
      return rejectWithValue((response as any).message);
    }
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message ?? error.message);
  }
});
