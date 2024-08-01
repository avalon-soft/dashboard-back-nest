import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity'

@Entity('auth')
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  @OneToOne(type => User, user => user.id)
  userId: number;

  @Column({ type: 'varchar', length: 15 })
  token: string;

}
