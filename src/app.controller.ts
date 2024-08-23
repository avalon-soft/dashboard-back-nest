import {
  Controller,
  Get,
} from '@nestjs/common';

@Controller({
  path: 'v1',
  version: 'v1',
})
export class AppController {

  @Get('test')
  getTestData(): {} {
    return { detail: 'OK' };
  }
}
