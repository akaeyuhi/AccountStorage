import { AuthUser } from 'features/account/types/AuthUser';

export interface AuthResponse {
  accessToken: string;
  user: AuthUser;
}
