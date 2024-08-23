import {
  IsString,
  IsNumber,
} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger';

class ChartOptionsDto {
  @ApiProperty()
  @IsString()
  color: string;

  @ApiProperty()
  @IsString()
  name: string;
}

class ChartDataDto {
  @ApiProperty()
  @IsNumber()
  x: number;

  @ApiProperty()
  @IsNumber()
  y: number;
}

export class ChartDto {
  @ApiProperty()
  options: ChartOptionsDto;

  @ApiProperty({
    isArray: true,
    type: () => ChartDataDto
  })
  data: ChartDataDto[]
}
