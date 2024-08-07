import {
  ExecutionContext, HttpException, HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Auth } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import {Repository} from 'typeorm'
import {jwtConstants} from './auth.constants'
import {Request} from 'express'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(Auth) private readonly authRepository: Repository<Auth>,
  ) {}

  async signIn(createAuthDto: CreateAuthDto): Promise<{ access_token: string } | { error: string}> {
    const user = await this.userService.findOne(createAuthDto.username);

    console.log(user)

    if (user) {
      const isMatch = await bcrypt.compare(createAuthDto.password, user?.password);
      if (!isMatch) {
        throw new UnauthorizedException();
      }

      const payload = { sub: user.id, username: user.username };
      const token = await this.jwtService.signAsync(payload)

      await this.authRepository.save({token, userId: user.id});

      return {
        access_token: token,
      };
    }
    throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

  }

  async getMeInfo(context: ExecutionContext): Promise<{}> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    const payload = await this.jwtService.verifyAsync(
      token,
      {
        secret: jwtConstants.secret
      }
    );
    const { user } = payload;
    return user
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
