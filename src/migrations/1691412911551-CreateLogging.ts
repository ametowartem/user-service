import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLogging1691412911551 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE logger
       (
           uuid uuid primary key,
           author varchar(255),
           method varchar(255),
           username   varchar(255)
       )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE logger`);
  }
}
