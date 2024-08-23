import * as dotenv from 'dotenv';
dotenv.config();
import {DataSource} from 'typeorm';
import {join} from 'path';
import * as process from 'process';


export const connectionSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, '/../../', 'database/migrations/**/*{.ts,.js}')],
  synchronize: false,
  logging: true,
  migrationsTableName: 'typeorm_migrations',
  migrationsRun: false,
});
