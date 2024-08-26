import {PrimaryGeneratedColumn} from 'typeorm'

export class Model {
  @PrimaryGeneratedColumn()
  id: number;
}
