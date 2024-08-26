import {PageOptionsDto} from '../../common/dtos/page-options.dto';
import {ApiPropertyOptional} from '@nestjs/swagger'
import {
  IsString,
  IsOptional
} from 'class-validator';

export class TableOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly status?:string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly name?:string;
}
