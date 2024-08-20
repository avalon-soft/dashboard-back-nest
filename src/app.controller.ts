import {Controller, Get, UseGuards} from '@nestjs/common'
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';

@Controller({
  path: 'v1',
  version: 'v1',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test')
  getTestData(): {} {
    return { detail: 'OK' };
  }

  @UseGuards(AuthGuard)
  @Get('statistic')
  getStatisticData(): {} {
    return this.appService.getStatisticData();
  }

  @UseGuards(AuthGuard)
  @Get('table')
  getTableData(): any[] {
    return this.appService.getTableData();
  }

  @UseGuards(AuthGuard)
  @Get('chart')
  getChartData(): any[] {
    return this.appService.getChartData();
  }
}
