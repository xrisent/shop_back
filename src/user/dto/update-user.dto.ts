import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'ФИО пользователя',
    type: String,
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'Пароль',
    type: String,
    required: false
  })
  password?: string

  @ApiProperty({
    description: 'Номер телефона пользователя',
    type: String,
    required: false,
  })
  number?: string;

  @ApiProperty({
    description: 'Email пользователя',
    type: String,
    required: false,
  })
  email?: string;

  @ApiProperty({
    description: 'Адрес пользователя',
    type: String,
    required: false,
  })
  address?: string;

  @ApiProperty({
    description: 'Избранные элементы пользователя',
    type: [Number],
    required: false,
  })
  favorites?: number[];
}
