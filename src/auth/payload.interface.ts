import { RoleEntity } from '../role/role.entity';

export class PayloadInterface {
  username: string;
  uuid: string;
  jti: string;
  ext: number;
  role: RoleEntity;
}
