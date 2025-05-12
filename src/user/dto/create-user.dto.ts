import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/order/entities/order.entity';

export class CreateUserDto {
  @ApiProperty({
    description: 'ФИО пользователя',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'Пароль',
    type: String,
  })
  password: string

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
  })
  favorites?: number[];

  @ApiProperty({
    description: 'История заказов',
    type: [Order],
    required: false,
    nullable: true,
    isArray: true
  })
  history?: Order[];
}
