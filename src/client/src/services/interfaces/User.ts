import { Role } from "../../utils/Roles";

export class User {
  name = '';
  group = '';
  email = '';
  variant = 0;
  telephone = '';
  password = '';
  gender = '';
  role: Role = Role.User;
}
