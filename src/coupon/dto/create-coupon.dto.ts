import { ApiProperty } from '@nestjs/swagger';

export class CreateCouponDto {
  @ApiProperty({
    description: 'The unique identifier for the coupon',
    example: 'SAVE20',
  })
  coupon: string;

  @ApiProperty({
    description: 'The discount percentage for the coupon',
    example: 20,
  })
  discount: number;

  @ApiProperty({
    description: 'Indicates whether the coupon has been used or not',
    example: false,
  })
  used: boolean;
}
