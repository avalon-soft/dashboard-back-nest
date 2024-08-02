import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto'
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller({
  path: 'api/v1/auth',
  version: 'v1',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse({ description: 'SIgnIn', type: CreateAuthDto })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signIn: CreateAuthDto) {
    return this.authService.signIn(signIn);
  }

  @ApiCreatedResponse({ description: 'Get me info' })
  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
