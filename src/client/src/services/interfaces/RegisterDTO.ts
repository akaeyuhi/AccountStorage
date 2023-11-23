import { Role } from 'utils/Roles';

export interface RegisterDto {
  name: string;
  group: string;
  email: string;
  variant: number;
  telephone: string;
  password: string;
  gender: string;
  role: Role;
}
