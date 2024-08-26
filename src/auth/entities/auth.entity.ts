import {
  Column,
  Entity,
  OneToOne
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import {Model} from '../../common/entities/model.entity';

@Entity('auth')
export class Auth extends Model {
  @Column({ type: 'int' })
  @OneToOne(type => User, user => user.id)
  userId: number;

  @Column({ type: 'varchar', length: 15 })
  token: string;

}
