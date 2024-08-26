import {
  Column,
  Entity,
} from 'typeorm';
import {Model} from '../../common/entities/model.entity';

@Entity('payment_key')
export class PaymentKey extends Model {
  @Column({ type: 'varchar' })
  key: string;

  @Column({ type: 'varchar', length: 100 })
  payment_provider: string;
}
