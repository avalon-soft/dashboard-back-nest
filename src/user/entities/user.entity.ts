import {
  Column,
  Entity,
  Unique,
} from 'typeorm';
import {Model} from '../../common/entities/model.entity';

@Entity('user')
export class User extends Model {
  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 15 })
  @Unique('username', ['username'])
  username: string;

  @Column({
    type: 'varchar',
    select: false
  })
  password: string;

  constructor(partial: Partial<User>) {
    super()
    Object.assign(this, partial);
  }
}
