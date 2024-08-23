import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique
} from 'typeorm';
import {Exclude} from 'class-transformer';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 15 })
  @Unique('username', ['username'])
  username: string;

  @Column({ type: 'varchar' })
  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
