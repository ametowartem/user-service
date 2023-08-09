import { Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { RoleEntity } from './role.entity';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async getRoleByCode(code: string): Promise<RoleEntity> {
    return this.roleRepository.getRoleByCode(code);
  }
}
