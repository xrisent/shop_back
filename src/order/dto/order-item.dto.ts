import { ApiProperty } from '@nestjs/swagger';

export class OrderItemDto {
  @ApiProperty({
    description: 'The ID of the product',
    type: Number,
  })
  productId: number;

  @ApiProperty({
    description: 'The ID of the color for the product',
    type: Number,
  })
  colorId: number;

  @ApiProperty({
    description: 'The ID of the size for the product',
    type: Number,
  })
  sizeId: number;

  @ApiProperty({
    description: 'The quantity of the product',
    type: Number,
  })
  quantity: number;
}