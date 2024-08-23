import { ApiProperty } from '@nestjs/swagger';
import { PageOptionsDto } from './page-options.dto';

export interface PageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto;
  itemCount: number;
  route: string;
}

export class PageMetaDto {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly size: number;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly previous: string;

  @ApiProperty()
  readonly next: string;

  constructor({ pageOptionsDto, itemCount, route }: PageMetaDtoParameters) {
    this.page = pageOptionsDto.page;
    this.size = pageOptionsDto.size;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.size);
    this.previous = this.page > 1 ? `${route}&page=${this.page - 1}` : null;
    this.next = this.page < this.pageCount ? `${route}&page=${this.page + 1}` : null;

  }
}
