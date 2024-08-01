import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm'

export class Auth1722515807906 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'auth',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'userId',
              type: 'int',
            },
            {
              name: 'token',
              type: 'varchar',
            },
          ],
        }),
        true,
      );

      await queryRunner.createForeignKey(
        'auth',
        new TableForeignKey({
          name: 'FK_auth_userId',
          columnNames: ['userId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'user',
          onDelete: 'CASCADE',
        }),
      );
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('auth', 'FK_auth_userId');
      await queryRunner.dropTable('auth');
    }

}
