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

  @Get('statistic')
  @UseGuards(AuthGuard)
  getStatisticData(): {} {
    return this.appService.getStatisticData();
  }

  @Get('table')
  @UseGuards(AuthGuard)
  getTableData(): any[] {
    return this.appService.getTableData();
  }

  @Get('chart')
  @UseGuards(AuthGuard)
  getChartData(): any[] {
    return this.appService.getChartData();
  }
}
