import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('dashboard_table')
export class Table {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  status: string;

  @Column({ type: 'varchar' })
  comment: string;
}
