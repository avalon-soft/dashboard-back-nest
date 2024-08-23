import {
  HttpStatus,
  Injectable
} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm';
import {Table} from './entities/table.entity'
import {Repository} from 'typeorm'
import {PageOptionsDto} from '../common/dtos/page-options.dto'
import {PageDto} from '../common/dtos/page.dto'
import {TableDto} from './dto/table.dto'
import {PageMetaDto} from '../common/dtos/page-meta.dto'
import {ChartDto} from './dto/chart.dto'
import {StatisticDto} from './dto/statistic.dto'
import {faker} from '@faker-js/faker';

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

  getStatisticData(): StatisticDto {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const userData = [
      {
        options: {
          color: faker.internet.color(),
          name: faker.internet.userName(),
        },
        data: months.map((month) => ({
          x: month,
          y: faker.number.int({ min: 100, max: 500 }),
        })),
      }, {
        options: {
          color: faker.internet.color(),
          name: faker.internet.userName(),
        },
        data: months.map((month) => ({
          x: month,
          y: faker.number.int({ min: 100, max: 500 }),
        })),
      },
    ];

    const salesData = [
      {
        options: {
          color: faker.internet.color(),
          name: faker.internet.userName(),
        },
        data: [
          { x: 'Q1', y: faker.number.int({ min: 1000, max: 5000 }) },
          { x: 'Q2', y: faker.number.int({ min: 1000, max: 5000 }) },
          { x: 'Q3', y: faker.number.int({ min: 1000, max: 5000 }) },
          { x: 'Q4', y: faker.number.int({ min: 1000, max: 5000 }) },
        ],
      },
    ];

    const trafficData = [
      {
        options: {
          color: faker.internet.color(),
          name: faker.internet.userName(),
        },
        data: months.map((month) => ({
          x: month,
          y: faker.number.int({ min: 1000, max: 5000 }),
        })),
      },
      {
        options: {
          color: faker.internet.color(),
          name: faker.internet.userName(),
        },
        data: months.map((month) => ({
          x: month,
          y: faker.number.int({ min: 500, max: 2000 }),
        })),
      },
    ];

    return {userData, salesData, trafficData}
  }

  getChartData(): ChartDto[] {
    const data: ChartDto[] = [];
    for (let i = 0; i < 3; i++) {
      const points: { x: number; y: number }[] = [];
      for (let j = 0; j < 50; j++) {
        points.push({
          x: faker.number.int({ min: -100, max: 100 }),
          y: faker.number.int({ min: -100, max: 100 }),
        });
      }
      data.push({
        options: {
          color: faker.internet.color(),
          name: faker.lorem.word(),
        },
        data: points,
      });
    }
    return data;
  }
}
