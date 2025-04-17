import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { CartItemDto } from "./cart-item.dto";

export class CreateCartDto {
    @ApiProperty({
      description: 'The user ID for whom the cart is being created.',
      example: 123,
    })
    userId: number;
  
    @ApiPropertyOptional()
    @ApiProperty({
      description: 'The coupon ID applied to the cart (if any).',
      example: 456,
      required: false,
    })
    couponId?: number;
  
    @ApiProperty({
      description: 'The total price of the cart excluding any discounts.',
      example: 500.0,
    })
    price: number;
  
    @ApiProperty({
      description: 'The total discount applied to the cart, if any.',
      example: 50.0,
    })
    couponPrice: number;
  
    @ApiProperty({
      description: 'The list of items in the cart.',
      type: [CartItemDto],
    })
    content: CartItemDto[];
  }