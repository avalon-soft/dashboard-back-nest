import {
  IsString,
  IsNumber,
} from 'class-validator'
import {
  ApiProperty,
  ApiExtraModels
} from '@nestjs/swagger';
import {PageMetaDto} from '../../common/dtos/page-meta.dto'

@ApiExtraModels(PageMetaDto)
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
