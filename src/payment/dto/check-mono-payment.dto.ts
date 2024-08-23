import {
  IsEmail,
  IsNotEmpty,
  IsInt,
  Min
} from 'class-validator';

export class CheckMonoPaymentDto {
  // @IsNotEmpty()
  invoiceId: string;

  // @IsNotEmpty()
  status: string;

  // @IsNotEmpty()
  amount: string;

  // @IsNotEmpty()
  ccy: string;

}
