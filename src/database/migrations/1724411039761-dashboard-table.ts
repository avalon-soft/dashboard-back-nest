import {MigrationInterface, QueryRunner, Table} from 'typeorm'

export class DashboardTable1724411039761 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'dashboard_table',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'name',
              type: 'varchar',
              length: '100'
            },
            {
              name: 'status',
              type: 'varchar',
              length: '100'
            },
            {
              name: 'comment',
              type: 'varchar',
            },
          ],
        }),
        true,
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('dashboard_table');
    }

}
