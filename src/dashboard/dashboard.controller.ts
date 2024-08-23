import {Controller, Get, UseGuards, Query, HttpStatus, HttpCode, Post} from '@nestjs/common'
import {ApiCreatedResponse, ApiTags} from '@nestjs/swagger'
import { DashboardService } from './dashboard.service'
import {AuthGuard} from '../auth/auth.guard'
import {TableDto} from './dto/table.dto'
import {PageOptionsDto} from '../common/dtos/page-options.dto'
import {PageDto} from '../common/dtos/page.dto'
import {ChartDto} from './dto/chart.dto'
import {StatisticDto} from './dto/statistic.dto'

@ApiTags('Dashboard')
@Controller({
  path: 'v1/dashboard',
  version: 'v1',
})
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post('table')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ description: 'Create fake table data - new 10 items', type: TableDto })
  async createTableData() {
    return this.dashboardService.createTableData()
  }

  @Get('table')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ description: 'Get table data', type: TableDto })
  async getTableData(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<TableDto>> {
    return this.dashboardService.findAllTableData(pageOptionsDto);
  }

  @Get('statistic')
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({ description: 'Get statistic data', type: StatisticDto })
  getStatisticData(): StatisticDto {
    return this.dashboardService.getStatisticData();
  }

  @Get('chart')
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({ description: 'Get chart data', type: ChartDto })
  getChartData(): ChartDto[] {
    return this.dashboardService.getChartData();
  }

}
