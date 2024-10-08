import {
  IsNotEmpty,
  IsInt,
  Min,
} from 'class-validator';
import {ApiProperty, ApiResponseProperty} from '@nestjs/swagger'

export class CreatePaymentDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsInt()
  @Min(0)
  amount: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsInt()
  currency: number;

  @ApiResponseProperty()
  pageUrl: string

  invoiceId: string;

  // @IsNotEmpty()
  payment_provider: string;

}
