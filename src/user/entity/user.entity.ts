import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserStatus } from '../const/user.status.enum';
import { RoleEntity } from '../../role/entity/role.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;
  @Column({ name: 'first_name' })
  firstName: string;
  @Column()
  patronymic: string;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  status: UserStatus;

  @ManyToOne(() => RoleEntity, (role) => role.users)
  @JoinColumn({ name: 'role_uuid' })
  role?: RoleEntity;

  constructor(
    firstName: string,
    patronymic: string,
    lastName: string,
    username: string,
    password: string,
    role: RoleEntity,
    status?: UserStatus,
    uuid?: string,
  ) {
    this.uuid = uuid;
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.patronymic = patronymic;
    this.lastName = lastName;
    this.status = status || UserStatus.Activated;
    this.role = role;
  }
}
