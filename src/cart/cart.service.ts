import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Product } from 'src/product/entities/product.entity';
import { Coupon } from 'src/coupon/entities/coupon.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async calculatePrice(content: any[]): Promise<number> {
    let total = 0;

    for (const item of content) {
      const productId = item.productId;
      if (!productId) {
        throw new NotFoundException(
          `Product id is missing in item: ${JSON.stringify(item)}`,
        );
      }

      const product = await this.productRepository.findOne({
        where: { id: productId },
      });
      if (!product) {
        throw new NotFoundException(`Product with id ${productId} not found`);
      }

      total += product.price * item.quantity;
    }

    return total;
  }

  async calculateCouponDiscount(
    price: number,
    couponId?: number,
  ): Promise<number> {
    if (!couponId) return price;
    const coupon = await this.couponRepository.findOne({
      where: { id: couponId },
    });
    if (!coupon)
      throw new NotFoundException(`Coupon with id ${couponId} not found`);
    return price - Math.floor((price * coupon.discount) / 100);
  }

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    const price = await this.calculatePrice(createCartDto.content);
    const couponPrice = await this.calculateCouponDiscount(
      price,
      createCartDto.couponId,
    );

    const cart = this.cartRepository.create({
      ...createCartDto,
      price,
      couponPrice,
      user: { id: createCartDto.userId },
    });

    return this.cartRepository.save(cart);
  }

  async createForUser(userId: number): Promise<Cart> {
    const user = await this.userRepository.findOne({ 
      where: { id: userId }
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const cart = this.cartRepository.create({
      user,
      content: [],
      price: 0,
      couponPrice: 0,
    });

    return this.cartRepository.save(cart);
  }

  async applyCoupon(cartId: number, couponId: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({ where: { id: cartId } });
    if (!cart) throw new NotFoundException(`Cart with id ${cartId} not found`);

    const coupon = await this.couponRepository.findOne({
      where: { id: couponId },
    });
    if (!coupon)
      throw new NotFoundException(`Coupon with id ${couponId} not found`);

    if (coupon.used) {
      throw new Error(`Coupon with id ${couponId} has already been used`);
    }

    const discount = await this.calculateCouponDiscount(cart.price, coupon.id);
    cart.coupon = coupon;
    cart.couponPrice = discount;

    coupon.used = true;
    await this.couponRepository.save(coupon);

    return this.cartRepository.save(cart);
  }

  findAll(): Promise<Cart[]> {
    return this.cartRepository.find({ relations: ['user', 'coupon'] });
  }

  findOne(id: number): Promise<Cart | null> {
    return this.cartRepository.findOne({
      where: { id },
      relations: ['user', 'coupon'],
    });
  }

  async update(id: number, updateCartDto: UpdateCartDto): Promise<Cart | null> {
    const price = updateCartDto.content
      ? await this.calculatePrice(updateCartDto.content)
      : 0;

    const couponPrice = await this.calculateCouponDiscount(
      price,
      updateCartDto.couponId,
    );

    await this.cartRepository.update(id, {
      ...updateCartDto,
      price,
      couponPrice,
    });

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.cartRepository.delete(id);
  }
}
