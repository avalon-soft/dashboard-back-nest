import {
  IsString,
  IsNumber,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class TableDto {
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  status: string;

  @IsString()
  @ApiProperty()
  comment: string;
}
