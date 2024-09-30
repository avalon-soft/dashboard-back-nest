import {Injectable,} from '@nestjs/common';
import {CreatePaymentDto} from '../dto/create-payment.dto';
import {CheckMonoPaymentDto} from '../dto/check-mono-payment.dto';

import {InjectRepository} from '@nestjs/typeorm';
import {Payment} from '../entities/payment.entity';
import {PaymentKey} from '../entities/payment-keys.entity';
import {Column, OneToOne, Repository} from 'typeorm'
import * as process from 'process';
import {HttpService} from '@nestjs/axios';
import crypto from 'crypto'
import {User} from '../../user/entities/user.entity'

@Injectable()
export class MonoService {
  constructor(
    @InjectRepository(Payment) private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(PaymentKey) private readonly paymentKeyRepository: Repository<PaymentKey>,
    private readonly httpService: HttpService
  ) {}

  async create(payment: CreatePaymentDto): Promise<{}> {

    const invoiceData = {
      "amount": payment.amount*100,
      "ccy": 980,
      "merchantPaymInfo": {
        "reference": "1",
        "destination": "Test payment",
        "comment": "Test payment",
        "customerEmails": [],
        "basketOrder": [
          {
            "name": "Test",
            "qty": 1,
            "sum": payment.amount*100,
            "icon": "",
            "unit": "шт.",
            "code": "1",
            "barcode": "",
            "header": "",
            "footer": "",
            "tax": [],
            "uktzed": "",
            "discounts": []
          }
        ]
      },
      "redirectUrl": "https://dashboard.disoft.dev/payment_result",
      "webHookUrl": "https://dashboard.disoft.dev/api/v1/payment/mono/invoice/check",
      "validity": 3600,
      "paymentType": "debit",
      "qrId": "XJ_DiM4rTd5V",
      "code": "0a8637b3bccb42aa93fdeb791b8b58e9",
    }

    const paymentRecord = this.paymentRepository.create({
      amount: payment.amount,
      invoiceId: null,
      payment_provider: 'MONO',
      userId: 1,
    })
    console.log(paymentRecord)

    invoiceData.merchantPaymInfo.reference = String(paymentRecord.id)

    const options = {
      data: invoiceData,
      headers: {
        'X-Token': process.env.PAYMENT_MONO_TOKEN
      }
    }

    const result = await this.httpService.axiosRef
      .post(`${ process.env.PAYMENT_MONO_API}api/merchant/invoice/create`, options)
    //   .then(response => {
    //     // const paymentUpdate: Payment = new Payment({
    //     //   id: paymentRecord.id,
    //     //   invoiceId: response.data.id
    //     // });
    //
    //     this.paymentRepository.update(paymentRecord.id, {
    //       invoiceId: response.data.id
    //     });
    //
    //     return response.data
    // })
    console.log(result)

    // this.paymentRepository.update(paymentRecord.id, {
    //   invoiceId: response.data.id
    // });

    // this.paymentKeyRepository.create({
        //   payment_provider: 'mono',
        //   key: res.data.key,
        // })
        //
        // return res.data.key
      //    await Payment.update({
        //             invoiceId: result.data.invoiceId
        //           }, {
        //             where: { id: paymentRecord.id },
        //           })
      // })
    return result
  }

  async check(headers:any, invoice: CheckMonoPaymentDto): Promise<{}> {

    const isSignOK = await this.checkSign(headers, invoice)

    return {}
  }

  private async checkSign(headers:any, body: CheckMonoPaymentDto): Promise<{}> {
    // console.log(111, headers)
    const xSignBase64 = headers['X-Sign']
    // console.log(xSignBase64)
    const message = JSON.stringify(body)

    let pubKeyBase64 = ''
    try {
      // console.log(1)
      const existKey = await this.paymentKeyRepository.findOne({
        where: {
          payment_provider: 'mono'
        }
      })
      pubKeyBase64 = existKey[0].key
    } catch (e) {
      // console.log(2)
      pubKeyBase64 = await this.getPubKey()
    }
    // console.log(pubKeyBase64)

    let signatureBuf = Buffer.from(String(xSignBase64), 'base64');
    let publicKeyBuf = Buffer.from(String(pubKeyBase64), 'base64');

    try {
      let verify = crypto.createVerify('SHA256')

      verify.write(message)
      verify.end()

      const result = verify.verify(publicKeyBuf, signatureBuf)
      console.log('Verification result: ' + result)
      return result
    }
    catch (e) {
      console.error('Error verify key')
      console.error(e)
      return false
    }
  }


  private async getPubKey(): Promise<string> {
    const options = {
      method: 'get',
      headers: {
        'X-Token': process.env.PAYMENT_MONO_TOKEN
      }
    }

    return this.httpService.axiosRef
      .get(`${process.env.PAYMENT_MONO_API}api/merchant/pubkey`, options)
      .then((res) => {
        this.paymentKeyRepository.create({
          payment_provider: 'mono',
          key: res.data.key,
        })

        return res.data.key
      })
  }

}
