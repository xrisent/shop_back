import { PartialType } from '@nestjs/mapped-types';
import { CreateSizeDto } from './create-size.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSizeDto extends PartialType(CreateSizeDto) {
  @ApiPropertyOptional({
    description: 'Размер, который будет обновлен',
    example: 'L',
  })
  size?: string;
}