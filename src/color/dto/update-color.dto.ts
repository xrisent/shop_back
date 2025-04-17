import { PartialType } from '@nestjs/mapped-types';
import { CreateColorDto } from './create-color.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateColorDto extends PartialType(CreateColorDto) {
  @ApiProperty({
    description: 'Цвет, который будет обновлен',
    example: 'Синий',
    required: false,
  })
  color?: string;
}