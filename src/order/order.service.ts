import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Cart } from 'src/cart/entities/cart.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(createOrderDto);
    return this.orderRepository.save(order);
  }

  findAll(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['user', 'coupon'] });
  }

  findOne(id: number): Promise<Order | null> {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'coupon'],
    });
  }

  async update(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order | null> {
    await this.orderRepository.update(id, updateOrderDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }

  async createFromCart(cart: Cart): Promise<Order> {
    const now = new Date();
    const bishkekOffsetMs = 6 * 60 * 60 * 1000; 
    const bishkekTime = new Date(now.getTime() + bishkekOffsetMs);

    const order = this.orderRepository.create({
      user: cart.user,
      products: cart.content,
      coupon: cart.coupon,
      finalPrice: cart.couponPrice,
      createdAt: bishkekTime,
    });

    return this.orderRepository.save(order);
  }
}
