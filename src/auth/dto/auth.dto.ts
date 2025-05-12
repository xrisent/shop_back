import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

export class LoginUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class RegisterUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  number: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  password: string;

  @ApiProperty({
    type: [Number],
  })
  favorites?: number[];
}

export class AuthResponseDto {
    @ApiProperty()
    access_token: string;
  
    @ApiProperty()
    user: User;
  }