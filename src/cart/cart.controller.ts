import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Order } from 'src/order/entities/order.entity';
import { JwtAuth } from 'src/auth/auth.decorator';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @JwtAuth()
  @Post()
  @ApiOperation({ summary: 'Create a cart item' })
  @ApiBody({ type: CreateCartDto })
  @ApiResponse({ status: 201, description: 'Cart item created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() dto: CreateCartDto) {
    return this.cartService.create(dto);
  }

  @JwtAuth()
  @Get()
  @ApiOperation({ summary: 'Get all cart items' })
  @ApiResponse({ status: 200, description: 'List of cart items.' })
  findAll() {
    return this.cartService.findAll();
  }
  @JwtAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get a cart item by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, description: 'Cart item found.' })
  @ApiResponse({ status: 404, description: 'Cart item not found.' })
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }
  @JwtAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a cart item by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateCartDto })
  @ApiResponse({ status: 200, description: 'Cart item updated successfully.' })
  @ApiResponse({ status: 404, description: 'Cart item not found.' })
  update(@Param('id') id: string, @Body() dto: UpdateCartDto) {
    return this.cartService.update(+id, dto);
  }
  @JwtAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a cart item by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, description: 'Cart item deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Cart item not found.' })
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
  @JwtAuth()
  @Post(':id/apply-coupon/:couponId')
  @ApiOperation({ summary: 'Apply a coupon to a cart' })
  @ApiParam({ name: 'id', description: 'Cart ID', type: 'number' })
  @ApiParam({ name: 'couponId', description: 'Coupon ID', type: 'number' })
  @ApiResponse({ status: 200, description: 'Coupon applied successfully' })
  @ApiResponse({ status: 404, description: 'Cart or Coupon not found' })
  applyCoupon(
    @Param('id') cartId: string,
    @Param('couponId') couponId: string,
  ) {
    return this.cartService.applyCoupon(+cartId, +couponId);
  }

  @JwtAuth()
  @Post(':id/add-product/:productId')
  @ApiOperation({ summary: 'Add a product to cart' })
  @ApiParam({ name: 'id', description: 'Cart ID', type: 'number' })
  @ApiParam({ name: 'productId', description: 'Product ID', type: 'number' })
  @ApiBody({
    description: 'Product details including color, size and quantity',
    schema: {
      type: 'object',
      properties: {
        colorId: { type: 'number', description: 'ID of the color' },
        sizeId: { type: 'number', description: 'ID of the size' },
        quantity: {
          type: 'number',
          description: 'Quantity of the product',
          default: 1,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Product added to cart successfully',
  })
  @ApiResponse({ status: 404, description: 'Cart or Product not found' })
  async addProductToCart(
    @Param('id') cartId: string,
    @Param('productId') productId: string,
    @Body() body: { colorId?: number; sizeId?: number; quantity?: number },
  ) {
    return this.cartService.addProductToCart(
      +cartId,
      +productId,
      body.colorId,
      body.sizeId,
      body.quantity || 1,
    );
  }

  @JwtAuth()
  @Post(':id/checkout')
  @ApiOperation({ summary: 'Checkout cart and create order' })
  @ApiParam({ name: 'id', description: 'Cart ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Order created successfully from cart',
    type: Order,
  })
  @ApiResponse({
    status: 404,
    description: 'Cart not found or cart is empty',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request (e.g., empty cart)',
  })
  async checkoutCart(@Param('id') cartId: string) {
    return this.cartService.checkout(+cartId);
  }
}
