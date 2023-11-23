import { AuthStoreError } from './AuthError';
import { AuthUser } from 'features/account/types/AuthUser';

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  error: AuthStoreError;
}
