import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcrypt';
import { Role } from '../../roles/roles.enum';

@Entity()
export class User {
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

  @Column({ type: 'varchar' })
  telephone: string;

  @Column({ type: 'varchar', select: false })
  password: string;

  @Column({ type: 'enum', enum: ['m', 'f', 'u'] })
  /**
   * m - male
   * f - female
   * u - unspecified
   */
  gender: string;

  @Column({ type: 'enum', enum: Role })
  role: string = Role.User;

  @Column({ type: 'varchar', nullable: true })
  fileLink?: string;

  @BeforeInsert() async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
