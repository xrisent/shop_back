import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Имя пользователя',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'Фамилия пользователя',
    type: String,
  })
  surname: string;

  @ApiProperty({
    description: 'Номер телефона пользователя',
    type: String,
  })
  number: string;

  @ApiProperty({
    description: 'Email пользователя',
    type: String,
  })
  email: string;

  @ApiProperty({
    description: 'Адрес пользователя',
    type: String,
  })
  address: string;

  @ApiProperty({
    description: 'Избранные элементы пользователя',
    type: [Number],
    required: false,
  })
  favorites?: number[];
}
