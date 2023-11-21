import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Role } from '../../roles/roles.enum';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;
const groupRegEx = /[A-Z]{2}-[0-9]{2}/;

export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters.' })
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @Matches(groupRegEx, {
    message: `Group name must be like the following pattern: IP-00`,
  })
  group: string;
  @IsNotEmpty()
  @IsEmail(null, { message: 'Please provide valid Email.' })
  email: string;
  @IsInt()
  variant: number;
  @IsPhoneNumber()
  telephone: string;
  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters, 
    at least one uppercase letter, 
    one lowercase letter, 
    one number and 
    one special character`,
  })
  password: string;
  @IsString()
  @IsEnum(['f', 'm', 'u'])
  gender: string;
  @IsString()
  @IsEnum(Role)
  role: string = Role.User;
}
