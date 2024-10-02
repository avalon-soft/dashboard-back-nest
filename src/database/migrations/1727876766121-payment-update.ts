import {Column, MigrationInterface, QueryRunner, TableColumn, TableUnique} from 'typeorm'

export class PaymentUpdate1727876766121 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.changeColumn(
        'payment',
        new TableColumn({
          name: 'invoiceId',
          type: 'varchar',
          length: '100'
        }),
        new TableColumn({
          name: 'invoiceId',
          type: 'varchar',
          isNullable: true,
          length: '100'
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.changeColumn(
        'payment',
        new TableColumn({
          name: 'invoiceId',
          type: 'varchar',
          isNullable: true,
          length: '100'
        }),
        new TableColumn({
          name: 'invoiceId',
          type: 'varchar',
          length: '100'
        }),
      );
    }

}
