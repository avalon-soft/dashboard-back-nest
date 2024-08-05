import { MigrationInterface, QueryRunner, TableUnique } from "typeorm";

export class UserUpdate1722845083207 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createUniqueConstraint(
      'user',
      new TableUnique({
        columnNames: ['username'],
      }),
    );
  }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropUniqueConstraint('user', 'username');
    }

}
