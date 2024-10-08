import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm'

export class PaymenUpdate1728398942337 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.addColumn(
        'payment',
        new TableColumn({
          name: 'currency',
          type: 'int',
          default: 980,
          isNullable: false
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('payment', 'currency');
    }

}
