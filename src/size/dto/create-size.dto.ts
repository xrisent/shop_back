import { ApiProperty } from '@nestjs/swagger';

export class CreateSizeDto {
  @ApiProperty({
    description: 'Размер, который будет создан',
    example: 'M',
  })
  size: string;
}