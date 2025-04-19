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
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Cart')
@ApiBearerAuth()
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: 'Create a cart item' })
  @ApiBody({ type: CreateCartDto })
  @ApiResponse({ status: 201, description: 'Cart item created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() dto: CreateCartDto) {
    return this.cartService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ summary: 'Get all cart items' })
  @ApiResponse({ status: 200, description: 'List of cart items.' })
  findAll() {
    return this.cartService.findAll();
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiOperation({ summary: 'Get a cart item by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, description: 'Cart item found.' })
  @ApiResponse({ status: 404, description: 'Cart item not found.' })
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @ApiOperation({ summary: 'Update a cart item by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateCartDto })
  @ApiResponse({ status: 200, description: 'Cart item updated successfully.' })
  @ApiResponse({ status: 404, description: 'Cart item not found.' })
  update(@Param('id') id: string, @Body() dto: UpdateCartDto) {
    return this.cartService.update(+id, dto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a cart item by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, description: 'Cart item deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Cart item not found.' })
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
  @UseGuards(AuthGuard('jwt'))
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

  
}
