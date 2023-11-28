import { RegisterDto } from 'services/interfaces/RegisterDto';

export interface LoginDto extends Partial<RegisterDto>{
  email: string;
  password: string;
}
