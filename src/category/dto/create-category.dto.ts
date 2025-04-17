import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Food', description: 'Название категории' })
  name: string;

  @ApiPropertyOptional({ example: 1, description: 'ID родительской категории (если есть)' })
  parentId?: number;
}
