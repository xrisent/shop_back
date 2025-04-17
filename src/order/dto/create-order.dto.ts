import { ApiProperty } from "@nestjs/swagger";
import { OrderItemDto } from "./order-item.dto";

export class CreateOrderDto {
    @ApiProperty({
      description: 'The ID of the user making the order',
      type: Number,
    })
    userId: number;
  
    @ApiProperty({
      description: 'A list of order items',
      type: [OrderItemDto],
    })
    products: OrderItemDto[];
  
    @ApiProperty({
      description: 'The date when the order was created',
      type: Date,
    })
    createdAt: Date;
  
    @ApiProperty({
      description: 'Optional coupon ID used in the order',
      type: Number,
      required: false,
    })
    couponId?: number;
  
    @ApiProperty({
      description: 'The final price of the order after any discounts',
      type: Number,
    })
    finalPrice: number;
  }