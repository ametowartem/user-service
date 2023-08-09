import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { ConfigService } from './core/service/configService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/user.entity';
import { RoleEntity } from './role/role.entity';
import { PermissionEntity } from './permission/permission.entity';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CoreModule,
    RoleModule,
    UserModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [CoreModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.databaseHost,
        port: configService.databasePort,
        username: configService.databaseUsername,
        password: configService.databasePassword,
        database: configService.databaseName,
        entities: [UserEntity, RoleEntity, PermissionEntity],
        migrations: ['src/migrations'],
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
