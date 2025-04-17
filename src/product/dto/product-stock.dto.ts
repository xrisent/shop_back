import { ApiProperty } from "@nestjs/swagger";

export class ProductStockDto {
    @ApiProperty({
      description: 'The color ID of the product variant',
      type: Number,
    })
    colorId: number;
  
    @ApiProperty({
      description: 'The size ID of the product variant',
      type: Number,
    })
    sizeId: number;
  
    @ApiProperty({
      description: 'The quantity of this variant in stock',
      type: Number,
    })
    quantity: number;
  }