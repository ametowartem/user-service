import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { ConfigService } from './core/service/configService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entity/user.entity';
import { RoleEntity } from './role/entity/role.entity';
import { PermissionEntity } from './permission/entity/permission.entity';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from './logger/logger.module';
import { UserHttpModule } from './user/user-http.module';
import { LoggerEntity } from './logger/entity/logger.entity';

@Module({
  imports: [
    CoreModule,
    RoleModule,
    UserHttpModule,
    AuthModule,
    LoggerModule,
    TypeOrmModule.forRootAsync({
      imports: [CoreModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.databaseHost,
        port: configService.databasePort,
        username: configService.databaseUsername,
        password: configService.databasePassword,
        database: configService.databaseName,
        entities: [UserEntity, RoleEntity, PermissionEntity, LoggerEntity],
        migrations: ['src/migrations'],
        logging: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
