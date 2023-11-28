import { Role } from 'utils/Roles';

export class User {
  id = 0;
  name = '';
  group = '';
  email = '';
  variant = 0;
  telephone = '';
  gender = '';
  role: Role = Role.User;
  fileLink = null;
}
