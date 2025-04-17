import { ApiProperty } from '@nestjs/swagger';

export class CreateColorDto {
  @ApiProperty({
    description: 'Цвет, который будет создан',
    example: 'Красный',
  })
  color: string;
}