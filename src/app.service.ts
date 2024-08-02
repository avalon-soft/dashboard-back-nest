import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';

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
}
