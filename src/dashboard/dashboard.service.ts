import {HttpStatus, Injectable} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import {Table} from './entities/table.entity'
import {Repository} from 'typeorm'
import {PageOptionsDto} from '../common/dtos/page-options.dto'
import {PageDto} from '../common/dtos/page.dto'
import {TableDto} from './dto/table.dto'
import {PageMetaDto} from '../common/dtos/page-meta.dto'
import { faker } from '@faker-js/faker';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Table) private readonly tableRepository: Repository<Table>,
  ) {}

  async createTableData () {
    for (let i = 0; i < 10; i++) {
      await this.tableRepository.save({
        name: faker.internet.userName(),
        status: faker.helpers.arrayElement(['created', 'in progress', 'success', 'error']),
        comment: faker.string.uuid()
      })
    }
    return HttpStatus.OK;
  }

  async findAllTableData(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<TableDto>> {
    const queryBuilder = this.tableRepository.createQueryBuilder('table');

    queryBuilder
      .orderBy('id', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.size);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount,
      route: `/api/v1/dashboard/table?order=${pageOptionsDto.order}&size=${pageOptionsDto.size}`,
    });

    return new PageDto(entities, pageMetaDto);
  }
}
