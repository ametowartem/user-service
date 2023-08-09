import { Module } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { PermissionService } from '../permission/permission.service';
import { CoreModule } from '../core/core.module';
import { RoleService } from './role.service';

@Module({
  imports: [CoreModule],
  providers: [RoleRepository, PermissionService, RoleService],
  exports: [PermissionService, RoleService],
})
export class RoleModule {}
