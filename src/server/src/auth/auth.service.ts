import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
    user: User,
  ): Promise<boolean> {
    const passwordCheck = await bcrypt.compare(password, user.password);
    return user.email === username && passwordCheck;
  }

  async doesUserExists(createUserDto: CreateUserDto): Promise<boolean> {
    const user = await this.usersService.findByUsername(createUserDto.email);
    return !!user;
  }

  async login(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findWithPassword(username);
    if (!(await this.validateUser(username, pass, user))) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, email: user.email, role: user.role };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      user: {
        role: user.role,
        email: user.email,
      },
    };
  }

  async register(createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
    return this.login(createUserDto.email, createUserDto.password);
  }
}
