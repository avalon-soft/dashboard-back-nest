import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Auth } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import {Repository} from 'typeorm'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(Auth) private readonly authRepository: Repository<Auth>,

  ) {}

  async signIn(createAuthDto: CreateAuthDto): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(createAuthDto.username);
    console.log(user)
    const isMatch = await bcrypt.compare(createAuthDto.password, user?.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    console.log(user)
    const payload = { sub: user.id, username: user.username };
    const token = await this.jwtService.signAsync(payload)

    await this.authRepository.save({token, userId: user.id});

    return {
      access_token: token,
    };
  }
}
