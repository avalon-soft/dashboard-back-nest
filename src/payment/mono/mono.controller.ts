import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Headers
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse
} from '@nestjs/swagger';
import {MonoService} from './mono.service';
import {CreatePaymentDto} from '../dto/create-payment.dto';
import {CheckMonoPaymentDto} from '../dto/check-mono-payment.dto';
import {AuthGuard} from '../../auth/auth.guard';

@ApiTags('Payment')
@Controller({
  path: 'v1/payment/mono',
  version: 'v1',
})
export class MonoController {
  constructor(private monoService: MonoService) {}

  @Post('invoice')
  // @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ description: 'Mono payment - Create invoice', type: CreatePaymentDto })
  createPayment(@Body() payment: CreatePaymentDto) {
    return this.monoService.create(payment);
  }

  @Post('check')
  // @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ description: 'Mono payment - Check invoice' })
  checkPayment(@Headers() headers:any, @Body() invoice: CheckMonoPaymentDto) {
    return this.monoService.check(headers, invoice);
  }

}
