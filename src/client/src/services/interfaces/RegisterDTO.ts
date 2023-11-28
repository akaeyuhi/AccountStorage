import { Role } from 'utils/Roles';

export interface RegisterDto {
  name: string;
  group: string;
  email: string;
  variant: string;
  telephone: string;
  password: string;
  confirmPassword: string;
  gender: string;
  role: Role;
}
