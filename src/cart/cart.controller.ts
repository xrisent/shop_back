import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({ summary: 'Create a cart item' })
  @ApiBody({ type: CreateCartDto })
  @ApiResponse({ status: 201, description: 'Cart item created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() dto: CreateCartDto) {
    return this.cartService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cart items' })
  @ApiResponse({ status: 200, description: 'List of cart items.' })
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a cart item by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, description: 'Cart item found.' })
  @ApiResponse({ status: 404, description: 'Cart item not found.' })
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a cart item by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateCartDto })
  @ApiResponse({ status: 200, description: 'Cart item updated successfully.' })
  @ApiResponse({ status: 404, description: 'Cart item not found.' })
  update(@Param('id') id: string, @Body() dto: UpdateCartDto) {
    return this.cartService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a cart item by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, description: 'Cart item deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Cart item not found.' })
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }

  @Post(':id/apply-coupon/:couponId')
  @ApiOperation({ summary: 'Apply a coupon to a cart' })
  @ApiParam({ name: 'id', description: 'Cart ID', type: 'number' })
  @ApiParam({ name: 'couponId', description: 'Coupon ID', type: 'number' })
  @ApiResponse({ status: 200, description: 'Coupon applied successfully' })
  @ApiResponse({ status: 404, description: 'Cart or Coupon not found' })
  applyCoupon(@Param('id') cartId: string, @Param('couponId') couponId: string) {
    return this.cartService.applyCoupon(+cartId, +couponId);
  }
}