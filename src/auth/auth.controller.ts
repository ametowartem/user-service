import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { SingInResponseDto } from './dto/sign-in.response.dto';
import { SingInRequestDto } from './dto/sign-in.request.dto';
import { UserPayloadDto } from './dto/user-payload.dto';
import { AuthGuard } from './auth.guard';
import { PermissionHandler } from '../permission/permission.decorator';
import { UserPermission } from '../permission/permission.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    type: SingInResponseDto,
    status: HttpStatus.OK,
  })
  @Post('/')
  signIn(@Body() body: SingInRequestDto) {
    return this.authService.signIn(body.username, body.password);
  }

  @ApiBearerAuth()
  @PermissionHandler(UserPermission.AllowGetUserProfile)
  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiResponse({
    type: UserPayloadDto,
    status: HttpStatus.OK,
  })
  getProfile(@Request() req): UserPayloadDto {
    return new UserPayloadDto({
      id: req.user.id,
      username: req.user.username,
      role: req.user.role,
    });
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Put('logout')
  async logout(@Request() req) {
    const payload = req.user;
    await this.authService.logout(payload);
  }
}
