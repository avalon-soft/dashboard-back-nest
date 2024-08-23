import {Column, Entity, OneToOne, PrimaryGeneratedColumn, Unique} from 'typeorm'

@Entity('payment_key')
export class PaymentKey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  key: string;

  @Column({ type: 'varchar', length: 100 })
  payment_provider: string;

}
