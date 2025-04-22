import { ApiProperty } from '@nestjs/swagger';

export class CreateColorDto {
  @ApiProperty({
    description: 'Цвет, который будет создан',
    example: 'Красный',
  })
  color: string;

  @ApiProperty({
    description: 'Код цвета',
    example: '№000000',
  })
  code: string;
}
