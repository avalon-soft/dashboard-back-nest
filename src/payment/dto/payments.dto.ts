import {
  IsString,
  IsNumber,
} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'

export class PaymentsListDto {
  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsString()
  invoiceId: string;

  @ApiProperty()
  @IsString()
  payment_provider: string;

}
