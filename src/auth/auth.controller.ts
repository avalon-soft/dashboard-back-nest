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
// import {AuthUser} from '../user/user.decorator'

@ApiTags('Auth')
@Controller({
  path: 'v1/auth',
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

  // @ApiCreatedResponse({ description: 'Get me info' })
  // @Get('me')
  // @UseGuards(AuthGuard)
  // getProfile(@Request() req:any) {
  //   return this.authService.getMeInfo(req.user);
  // }
}
