import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserPayloadDto {
  constructor(data: Required<UserPayloadDto>) {
    Object.assign(this, data);
  }

  @ApiProperty({
    example: 'admin',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 2,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    example: 'user',
  })
  @IsNumber()
  @IsNotEmpty()
  role: string;
}
