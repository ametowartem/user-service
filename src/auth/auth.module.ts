import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { CoreModule } from '../core/core.module';
import { ConfigService } from '../core/service/configService';
import { appProviders } from '../core/core.provider';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.registerAsync({
      imports: [CoreModule],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.jwtSecret,
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    CoreModule,
    RoleModule,
  ],
  providers: [AuthService, ...appProviders],
  exports: [AuthService],
})
export class AuthModule {}
