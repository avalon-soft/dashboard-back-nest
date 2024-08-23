import {
  IsString,
  IsNumber,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';


class StatisticDataDto {
  @ApiProperty()
  @IsString()
  x: string;

  @ApiProperty()
  @IsNumber()
  y: number;
}

class StatisticOptionsDto {
  @ApiProperty()
  @IsString()
  color: string;

  @ApiProperty()
  @IsString()
  name: string;
}

class StatisticUsersDto {
  @ApiProperty()
  options: StatisticOptionsDto;

  @ApiProperty({
    isArray: true,
    type: () => StatisticDataDto
  })
  data: StatisticDataDto[];
}

class StatisticSalesDto {
  @ApiProperty()
  options: StatisticOptionsDto;

  @ApiProperty({
    isArray: true,
    type: () => StatisticDataDto
  })
  data: StatisticDataDto[];
}

class StatisticTrafficDto {
  @ApiProperty()
  options: StatisticOptionsDto;

  @ApiProperty({
    isArray: true,
    type: () => StatisticDataDto
  })
  data: StatisticDataDto[];
}

export class StatisticDto {
  @ApiProperty({
    isArray: true,
    type: () => StatisticUsersDto
  })
  userData: StatisticUsersDto[];

  @ApiProperty({
    isArray: true,
    type: () => StatisticSalesDto
  })
  salesData: StatisticSalesDto[];

  @ApiProperty({
    isArray: true,
    type: () => StatisticTrafficDto
  })
  trafficData: StatisticTrafficDto[];

}
