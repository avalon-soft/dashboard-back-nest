import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';

interface ChartData {
  options: {
    color: string;
    name: string;
  };
  data: {
    x: number;
    y: number;
  }[];
}
@Injectable()
export class AppService {
  getTableData(): any[] {
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        id: i + 1,
        name: faker.internet.userName(),
        status: faker.helpers.arrayElement(['created', 'in progress', 'success', 'error']),
      });
    }
    return data;
  }

  getChartData(): any[] {
    const data: ChartData[] = [];
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
