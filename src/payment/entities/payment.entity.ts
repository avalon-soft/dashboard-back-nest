import {Column, Entity, OneToOne, PrimaryGeneratedColumn, Unique} from 'typeorm'
import {User} from '../../user/entities/user.entity'

@Entity('payment')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

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
