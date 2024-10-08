import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  UseGuards,
  Headers, Request,
} from '@nestjs/common'
import {
  ApiTags,
  ApiCreatedResponse
} from '@nestjs/swagger';
import {MonoService} from './mono.service';
import {CreatePaymentDto} from '../dto/create-payment.dto';
import {CheckMonoPaymentDto} from '../dto/check-mono-payment.dto';
import {PaymentsListDto} from '../dto/payments.dto';
import {AuthGuard} from '../../auth/auth.guard';

@ApiTags('Payment')
@Controller({
  path: 'v1/payment/mono',
  version: 'v1',
})
export class MonoController {
  constructor(private monoService: MonoService) {}

  @Get('my')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ description: 'Mono payment - Get all list of my payments', type: PaymentsListDto })
  findAll(@Request() req: { user: { sub: number }}) {
    return this.monoService.findAllByUser(req.user);
  }

  @Post('invoice')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ description: 'Mono payment - Create invoice', type: CreatePaymentDto })
  createPayment(@Request() req: { user: { sub: number }}, @Body() payment: CreatePaymentDto) {
    console.log(req.user)
    return this.monoService.create(req.user, payment);
  }

  @Post('check')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ description: 'Mono payment - Check invoice' })
  checkPayment(@Headers() headers:any, @Body() invoice: CheckMonoPaymentDto) {
    return this.monoService.check(headers, invoice);
  }

}
