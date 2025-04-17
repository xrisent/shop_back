import { PartialType } from '@nestjs/mapped-types';
import { CreateCouponDto } from './create-coupon.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCouponDto extends PartialType(CreateCouponDto) {
  @ApiProperty({
    description: 'The unique identifier for the coupon (optional for updates)',
    example: 'SAVE20',
    required: false,
  })
  coupon?: string;

  @ApiProperty({
    description: 'The discount percentage for the coupon (optional for updates)',
    example: 20,
    required: false,
  })
  discount?: number;

  @ApiProperty({
    description: 'Indicates whether the coupon has been used or not (optional for updates)',
    example: false,
    required: false,
  })
  used?: boolean;
}