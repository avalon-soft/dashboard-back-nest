import {
  Injectable,
} from '@nestjs/common'
import {CreatePaymentDto} from '../dto/create-payment.dto'
import {InjectRepository} from '@nestjs/typeorm'
import { Payment } from '../entities/payment.entity'
import { PaymentKey } from '../entities/payment-keys.entity'
import {Repository} from 'typeorm'
import * as process from 'node:process'
import {HttpService} from '@nestjs/axios'

@Injectable()
export class MonoService {
  constructor(
    @InjectRepository(Payment) private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(PaymentKey) private readonly paymentKeyRepository: Repository<PaymentKey>,
    private readonly httpService: HttpService
  ) {}

  async create(payment: CreatePaymentDto): Promise<{}> {

    const data = {
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
    return {}
  }

  async check(invoice: {invoiceId:string, status: string}, headers:any): Promise<{}> {

    const isSignOK = await this.checkSign(headers)

    return {}
  }

  private async checkSign(headers:any): Promise<{}> {
    console.log(111, headers)
    const xSignBase64 = headers['X-Sign']

    let pubKeyBase64 = ''
    try {
      const existKey = await this.paymentKeyRepository.findOne({
        where: {
          payment_provider: 'mono'
        }
      })
      pubKeyBase64 = existKey[0].key
    } catch (e) {
      // await this.getPubKey()
      pubKeyBase64 = await this.getPubKey()
    }

    // let signatureBuf = Buffer.from(String(xSignBase64), 'base64');
    // let publicKeyBuf = Buffer.from(String(pubKeyBase64), 'base64');

    return {}
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
