import {MigrationInterface, QueryRunner, Table} from 'typeorm'

export class PaymentKey1724232981273 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'payment_key',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            }, {
              name: 'key',
              type: 'varchar'
            }, {
              name: 'payment_provider',
              type: 'varchar',
              length: '100'
            },
          ],
        }),
        true,
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('payment_key');
    }

}
