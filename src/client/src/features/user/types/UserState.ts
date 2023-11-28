import { User } from 'services/interfaces/User';
import { UserStoreError } from 'features/user/types/UserStoreError';

export interface UserState {
  user: User | null,
  loading: boolean,
  error: UserStoreError,
}
