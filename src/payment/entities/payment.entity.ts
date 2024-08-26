import {
  Column,
  Entity,
  OneToOne,
} from 'typeorm';
import {User} from '../../user/entities/user.entity';
import {Model} from '../../common/entities/model.entity';

@Entity('payment')
export class Payment extends Model {
  @Column({ type: 'integer' })
  amount: number;

  @Column({ type: 'varchar', length: 100 })
  invoiceId: string;

  @Column({ type: 'varchar', length: 100 })
  payment_provider: string;

  @Column({ type: 'int' })
  @OneToOne(type => User, user => user.id)
  userId: number;

}
