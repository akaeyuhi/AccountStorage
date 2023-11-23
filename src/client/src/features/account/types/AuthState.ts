import { AuthStoreError } from "./AuthError";

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: AuthStoreError;
}
