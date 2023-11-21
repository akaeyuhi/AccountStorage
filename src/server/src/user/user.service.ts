import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from '../roles/roles.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new User();
    newUser.name = createUserDto.name;
    newUser.email = createUserDto.email;
    newUser.group = createUserDto.group;
    newUser.variant = createUserDto.variant;
    newUser.telephone = createUserDto.telephone;
    newUser.password = createUserDto.password;
    newUser.gender = createUserDto.gender;
    newUser.role = createUserDto.role ?? Role.User;
    return this.userRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findAdmins(): Promise<User[]> {
    return this.userRepository.findBy({
      role: Role.Admin,
    });
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  findByUsername(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async findWithPassword(email: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .select('user.id', 'id')
      .addSelect('user.password')
      .addSelect('user.email')
      .where('user.email = :email', { email })
      .getOne();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({ id }, updateUserDto);
  }

  setRole(id: number, newRole: Role) {
    return this.userRepository.update({ id }, { role: newRole });
  }

  async remove(id: number) {
    return this.userRepository.remove(await this.findOne(id));
  }

  uploadPhoto(file: Express.Multer.File) {
    console.log(file);
  }
}
