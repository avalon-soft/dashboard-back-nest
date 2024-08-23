import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm'

export class PaymentCreate1724159126834 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.createTable(
        new Table({
          name: 'payment',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            }, {
              name: 'userId',
              type: 'int',
            }, {
              name: 'amount',
              type: 'int',
            }, {
              name: 'invoiceId',
              type: 'varchar',
              length: '100'
            }, {
              name: 'payment_provider',
              type: 'varchar',
              length: '100'
            },
          ],
        }),
        true,
      );

      await queryRunner.createForeignKey(
        'payment',
        new TableForeignKey({
          name: 'FK_payment_userId',
          columnNames: ['userId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'user',
          onDelete: 'CASCADE',
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('payment', 'FK_payment_userId');
      await queryRunner.dropTable('payment');
    }

}
