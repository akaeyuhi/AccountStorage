import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role} from '../roles/roles.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new User(createUserDto);
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({ id }, updateUserDto);
  }

  setRole(id: number, newRole: Role) {
    return this.userRepository.update({ id }, { role: newRole });
  }

  async remove(id: number) {
    return this.userRepository.remove(await this.findOne(id));
  }
}
