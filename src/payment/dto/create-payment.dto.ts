import {
  IsNotEmpty,
  IsInt,
  Min
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreatePaymentDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsInt()
  @Min(0)
  amount: number;

  @IsNotEmpty()
  invoiceId: string;

  @IsNotEmpty()
  payment_provider: string;

}
