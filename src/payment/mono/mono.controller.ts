import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Headers
} from '@nestjs/common';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { MonoService } from './mono.service'
import { CreatePaymentDto } from '../dto/create-payment.dto'
import { CheckMonoPaymentDto } from '../dto/check-mono-payment.dto'
import { AuthGuard } from '../../auth/auth.guard';

@ApiTags('Payment')
@Controller({
  path: 'v1/payment/mono',
  version: 'v1',
})
export class MonoController {
  constructor(private monoService: MonoService) {}

  @UseGuards(AuthGuard)
  @ApiCreatedResponse({ description: 'Mono payment - Create invoice', type: CreatePaymentDto })
  @HttpCode(HttpStatus.OK)
  @Post('invoice')
  createPayment(@Body() payment: CreatePaymentDto) {
    return this.monoService.create(payment);
  }

  @UseGuards(AuthGuard)
  @ApiCreatedResponse({ description: 'Mono payment - Check invoice' })
  @HttpCode(HttpStatus.OK)
  @Post('check')
  checkPayment(@Headers() headers:any, @Body() invoice: CheckMonoPaymentDto) {
    return this.monoService.check(invoice, headers);
  }

}
