import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ConfigService } from '../core/service/configService';
import { JwtService } from '@nestjs/jwt';
import { REDIS_PROVIDER } from '../core/core.provider';
import IORedis from 'IORedis';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { PayloadInterface } from './payload.interface';
import * as moment from 'moment';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @Inject(REDIS_PROVIDER)
  private readonly redis: IORedis;

  async signIn(username: string, password: string) {
    const user = await this.userService.findOneByUsername(username);
    const isMatch = bcrypt.compare(password, user?.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const jti = uuidv4();

    const payload: PayloadInterface = {
      username: username,
      uuid: user.uuid,
      jti: jti,
      ext: moment().add(this.configService.ext, 'seconds').unix(),
      role: user.role,
    };

    this.redis.sadd(this.getUserTokenWhiteList(user.uuid), jti);

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: this.configService.jwtSecret,
      }),
    };
  }

  getUserTokenWhiteList(id): string {
    return `user-access-tokens-white-list:${id}`;
  }

  async checkRedisIsMember(payload: PayloadInterface): Promise<boolean> {
    return await this.redis
      .sismember(this.getUserTokenWhiteList(payload.uuid), payload.jti)
      .then((value) => {
        return value !== 0;
      });
  }
  async logout(payload: PayloadInterface) {
    await this.redis.srem(
      this.getUserTokenWhiteList(payload.uuid),
      payload.jti,
    );
  }
}
