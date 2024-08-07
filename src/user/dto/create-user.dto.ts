import {
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  IsEmail
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const passwordRegEx = /.{8,20}$/;

export class CreateUserDto {
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

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters`
  })
  @ApiProperty()
  password: string;
}
