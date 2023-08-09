import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as process from 'process';
import { UserEntity } from './user/user.entity';
import { RoleEntity } from './role/role.entity';
import { PermissionEntity } from './permission/permission.entity';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [UserEntity, RoleEntity, PermissionEntity],
  migrations: ['./src/migrations/*.ts'],
});
