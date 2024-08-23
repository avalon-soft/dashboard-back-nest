import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {MonoController} from './mono/mono.controller';
import {MonoService} from './mono/mono.service';
import {Payment} from './entities/payment.entity';
import {PaymentKey} from './entities/payment-keys.entity';
import {HttpModule} from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, PaymentKey]),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [MonoController],
  providers: [MonoService],
  exports: [MonoService],
})
export class PaymentModule {}
