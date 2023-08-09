import { Body, Controller, Post } from '@nestjs/common';
import { PermissionService } from '../permission/permission.service';
import { CreateUserRequestDto } from './dto/create-user.request.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(
    private readonly permissionService: PermissionService,
    private readonly userService: UserService,
  ) {}

  @Post('registry')
  registry(@Body() body: CreateUserRequestDto) {
    return this.userService.registry({
      firstName: body.firstName,
      patronymic: body.patronymic,
      lastName: body.lastName,
      username: body.username,
      password: body.password,
    });
  }
}
