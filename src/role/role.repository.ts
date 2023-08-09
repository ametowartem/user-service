import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { RoleEntity } from './role.entity';

@Injectable()
export class RoleRepository extends Repository<RoleEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(RoleEntity, dataSource.createEntityManager());
  }

  async getPermissions() {
    return await this.createQueryBuilder('roles')
      .leftJoinAndSelect('roles.permissions', 'permissions')
      .getMany();
  }

  async getRoleByCode(code: string): Promise<RoleEntity> {
    return await this.createQueryBuilder('roles')
      .where({ code })
      .leftJoinAndSelect('roles.permissions', 'permissions')
      .getOne();
  }
}
