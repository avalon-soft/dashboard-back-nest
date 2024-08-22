import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus} from '@nestjs/common'
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';

@ApiTags('User')
@Controller({
  path: 'v1/user',
  version: 'v1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({ description: 'Create a new user', type: CreateUserDto })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiCreatedResponse({ description: 'Get all list of users' })
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiCreatedResponse({ description: 'Change user by id' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiCreatedResponse({ description: 'Delete user by id' })
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
