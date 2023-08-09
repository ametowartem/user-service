import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserInterface } from './create-user.interface';
import { ConfigService } from '../core/service/configService';
import { RoleService } from '../role/role.service';
import { UserRole } from '../role/role.enum';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly roleService: RoleService,
  ) {}

  async registry(UserDto: CreateUserInterface) {
    const hash = await bcrypt.hash(
      UserDto.password,
      this.configService.saltRounds,
    );

    const user = new UserEntity(
      UserDto.firstName,
      UserDto.patronymic,
      UserDto.lastName,
      UserDto.username,
      hash,
      await this.roleService.getRoleByCode(UserRole.User),
    );

    try {
      await this.add(user);
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('User already exists');
      }

      throw new InternalServerErrorException();
    }
  }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async remove(uuid: number): Promise<void> {
    await this.userRepository.delete(uuid);
  }

  async add(user: UserEntity): Promise<void> {
    await this.userRepository.saveUser(user);
  }

  async findOneByUsername(username: string) {
    return await this.userRepository.findOneByUsername(username);
  }
}
