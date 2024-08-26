import {
  Column,
  Entity,
} from 'typeorm';
import {Model} from '../../common/entities/model.entity';

@Entity('dashboard_table')
export class Table extends Model {
  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  status: string;

  @Column({ type: 'varchar' })
  comment: string;
}
