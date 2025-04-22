import { ApiProperty } from '@nestjs/swagger';
import { ProductStockDto } from './product-stock.dto';

export class CreateProductDto {
  @ApiProperty({ description: 'The name of the product', type: String })
  name: string;

  @ApiProperty({ description: 'A detailed description of the product', type: String })
  description: string;

  @ApiProperty({ description: 'The price of the product', type: Number })
  price: number;

  @ApiProperty({ description: 'The old price of the product', type: Number })
  oldPrice: number;

  @ApiProperty({ description: 'The country where the product was made', type: String })
  madeIn: string;

  @ApiProperty({ description: 'The brand of the product', type: String })
  brand: string;

  @ApiProperty({ description: 'The material of the product', type: String })
  material: string;

  @ApiProperty({ description: 'The ID of the product category', type: Number })
  categoryId: number;

  @ApiProperty({
    description: 'The date when the product was created',
    type: String,
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The main image file of the product (upload)',
    type: 'string',
    format: 'binary',
    required: false,
  })
  mainImage?: any;

  @ApiProperty({
    description: 'Additional image files of the product (upload)',
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    required: false,
  })
  additionalImages?: any;

  @ApiProperty({
    description: 'Stock information of the product',
    type: ProductStockDto,
    isArray: true,
  })
  stock: ProductStockDto[];
}
