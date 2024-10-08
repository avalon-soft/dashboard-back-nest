import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  Request,
  SerializeOptions,
} from '@nestjs/common'
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {AuthGuard} from '../auth/auth.guard';
import {
  ApiTags,
  ApiCreatedResponse
} from '@nestjs/swagger';
import {User} from './entities/user.entity';

@ApiTags('User')
@Controller({
  path: 'v1/user',
  version: 'v1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  @SerializeOptions({
    excludeExtraneousValues: true,
  })
  @ApiCreatedResponse({ description: 'Get me info' })
  getProfile(@Request() req: { user: { id: number }}):Promise<User> {
    return this.userService.getMeInfo(req.user);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({ description: 'Create a new user', type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({ description: 'Get all list of users' })
  findAll() {
    return this.userService.findAll();
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({ description: 'Change user by id' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(204)
  @ApiCreatedResponse({ description: 'Delete user by id' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
