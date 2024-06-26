import { Module } from '@nestjs/common';
import { ConfigService } from './service/configService';
import { appProviders } from './core.provider';
@Module({
  providers: [ConfigService, ...appProviders],
  exports: [ConfigService, ...appProviders],
})
export class CoreModule {}
