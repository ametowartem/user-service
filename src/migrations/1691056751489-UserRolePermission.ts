import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserRolePermisson1691056751489 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE if not exists users(
            uuid uuid DEFAULT uuid_generate_v4() primary key,
            first_name varchar(255) not null,
            patronymic varchar(255) not null,
            last_name varchar(255) not null,
            username varchar(255) not null, 
            password varchar(255) not null, 
            status varchar(255) not null, 
            role varchar(255) not null
      )`,
    );
    await queryRunner.query(
      `CREATE TABLE if not exists roles(
            uuid uuid DEFAULT uuid_generate_v4() primary key, 
            name varchar(255) not null , 
            code varchar(255) unique not null
      )`,
    );
    await queryRunner.query(
      `CREATE TABLE if not exists permissions(
            uuid uuid DEFAULT uuid_generate_v4() primary key, 
            name varchar(255) not null, 
            code varchar(255) unique not null, 
            description varchar(255)
      )`,
    );
    await queryRunner.query(
      `CREATE TABLE if not exists roles_permissions(
            uuid uuid DEFAULT uuid_generate_v4() primary key, 
            role_uuid uuid not null, 
            permission_uuid uuid not null
      )`,
    );
    await queryRunner.query(
      `ALTER TABLE roles_permissions 
            ADD FOREIGN KEY (role_uuid) REFERENCES roles(uuid)`,
    );
    await queryRunner.query(
      `ALTER TABLE roles_permissions 
            ADD FOREIGN KEY (permission_uuid) REFERENCES permissions(uuid)`,
    );
    await queryRunner.query(
      `ALTER TABLE users 
            ADD FOREIGN KEY (role) REFERENCES roles(code)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE users');
    await queryRunner.query('DROP TABLE roles_permissions');
    await queryRunner.query('DROP TABLE roles');
    await queryRunner.query('DROP TABLE permissions');
  }
}
