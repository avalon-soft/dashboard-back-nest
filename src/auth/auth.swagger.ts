import { ApiProperty } from '@nestjs/swagger';

export class SignIn {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
