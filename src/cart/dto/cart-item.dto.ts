import { ApiProperty } from '@nestjs/swagger';

export class CartItemDto {
  @ApiProperty({
    description: 'The product ID in the cart item.',
    example: 1,
  })
  productId: number;

  @ApiProperty({
    description: 'The color ID associated with the product.',
    example: 2,
  })
  colorId: number;

  @ApiProperty({
    description: 'The size ID of the product.',
    example: 3,
  })
  sizeId: number;

  @ApiProperty({
    description: 'The quantity of the product in the cart.',
    example: 2,
  })
  quantity: number;
}