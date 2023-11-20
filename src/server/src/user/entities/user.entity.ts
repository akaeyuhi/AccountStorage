import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { hash } from 'bcrypt';
import { Role } from '../../roles/roles.enum';

@Entity()
export class User {
  constructor(userDTO: CreateUserDto) {
    this.name = userDTO.name;
    this.email = userDTO.email;
    this.group = userDTO.group;
    this.variant = userDTO.variant;
    this.telephone = userDTO.telephone;
    this.password = userDTO.password;
    this.gender = userDTO.gender;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 5 })
  group: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'int' })
  variant: number;

  @Column({ type: 'int' })
  telephone: number;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: ['m', 'f', 'u'] })
  /**
   * m - male
   * f - female
   * u - unspecified
   */
  gender: string;

  @Column({ type: 'string' })
  role: Role = Role.User;

  @BeforeInsert() async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
