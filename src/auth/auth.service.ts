import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(
    username: string,
    pass: string
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(username);
    const isMatch = await bcrypt.compare(pass, user?.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    console.log(user)
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
