import * as dotenv from 'dotenv';
dotenv.config();
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DataSource} from 'typeorm';
import {ConfigModule, ConfigService} from '@nestjs/config';
import * as process from 'process';
import {join} from 'path';
import {ServeStaticModule} from '@nestjs/serve-static';

import {AppController} from './app.controller';
import {AppService} from './app.service';

import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import {DashboardModule} from './dashboard/dashboard.module'
import { PaymentModule } from './payment/payment.module';
// import { CertificateModule } from './certificate/certificate.module';


// console.log(ConfigService.get('DB_USER'))

@Module({
  imports: [
    AuthModule,
    UserModule,
    DashboardModule,
    PaymentModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
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
    }),
    // CertificateModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets'),
      serveRoot: '/assets',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
