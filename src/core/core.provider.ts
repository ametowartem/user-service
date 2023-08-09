import { Provider } from '@nestjs/common';
import { ConfigService } from './service/configService';
import IORedis from 'IORedis';

export const REDIS_PROVIDER = Symbol('REDIS_PROVIDER');

export const appProviders = [
  {
    provide: REDIS_PROVIDER,
    useFactory: (configService: ConfigService) =>
      new IORedis({
        port: configService.redisPort,
        host: configService.redisHost,
      }),
    inject: [ConfigService],
  },
] as Provider[];
