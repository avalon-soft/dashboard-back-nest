import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsEmail
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class UserDto {
  @IsNotEmpty({
    message: 'Name not be null',
  })
  @IsString()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  @ApiProperty()
  full_name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
}
