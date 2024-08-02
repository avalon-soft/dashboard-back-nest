import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';

interface Statistic {
  userData: any[];
  salesData: any[];
  trafficData: any[];
}
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

  getStatisticData(): Statistic {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const userData = [
      {
        options: {
          color: faker.internet.color(),
          name: 'User Count',
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
          name: 'Sales Revenue',
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
          name: 'Page Views',
        },
        data: months.map((month) => ({
          x: month,
          y: faker.number.int({ min: 1000, max: 5000 }),
        })),
      },
      {
        options: {
          color: faker.internet.color(),
          name: 'Unique Visitors',
        },
        data: months.map((month) => ({
          x: month,
          y: faker.number.int({ min: 500, max: 2000 }),
        })),
      },
    ];

    return {userData, salesData, trafficData}
  }

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
