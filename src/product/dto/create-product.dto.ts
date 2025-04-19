import { ApiProperty } from '@nestjs/swagger';
import { ProductStockDto } from './product-stock.dto';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'A detailed description of the product',
    type: String,
  })
  description: string;

  @ApiProperty({
    description: 'The price of the product',
    type: Number,
  })
  price: number;

  @ApiProperty({
    description: 'The old price of the product',
    type: Number,
  })
  oldPrice: number;

  @ApiProperty({
    description: 'The country where the product was made',
    type: String,
  })
  madeIn: string;

  @ApiProperty({
    description: 'The ID of the product category',
    type: Number,
  })
  categoryId: number;

  @ApiProperty({
    description: 'The date when the product was created',
    type: String,
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The main image URL of the product',
    type: String,
  })
  mainImage: string;

  @ApiProperty({
    description: 'Additional images of the product',
    type: [String],
  })
  additionalImages: string[];

  @ApiProperty({
    description: 'Stock information of the product',
    type: [ProductStockDto],
  })
  stock: ProductStockDto[];
}