import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { RoleEntity } from '../role/role.entity';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(RoleEntity, dataSource.createEntityManager());
  }

  findOneByUsername(username: string) {
    return this.findOneBy({ username });
  }

  async saveUser(user: UserEntity) {
    try {
      const savedUser = await this.save(user);
      console.log('Новый пользователь сохранен:', savedUser);
    } catch (error) {
      console.error('Ошибка при сохранении пользователя:', error);
    }
  }
}
