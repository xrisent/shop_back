import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Cart } from 'src/cart/entities/cart.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
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
      sold: false
    });

    return this.orderRepository.save(order);
  }

  async markAsSold(id: number): Promise<Order | null> {
    const order = await this.orderRepository.findOne({
      where: { id }
    });
  
    if (!order) return null;
  
    for (const item of order.products) {
      const product = await this.productRepository.findOne({
        where: { id: item.product.id }
      });
  
      if (!product) {
        throw new NotFoundException(`Product with id ${item.product.id} not found`);
      }
  
      const colorId = item.color?.id ?? 0;
      const sizeId = item.size?.id ?? 0;
  
      const stockIndex = product.stock.findIndex(s =>
        s.color.id === colorId && s.size.id === sizeId
      );
  
      if (stockIndex === -1) {
        throw new NotFoundException(`Stock not found for product ${product.id} with color ${colorId} and size ${sizeId}`);
      }
  
      if (product.stock[stockIndex].quantity < item.quantity) {
        throw new BadRequestException(
          `Not enough stock for product ${product.id} with color ${colorId} and size ${sizeId}`
        );
      }
  
      product.stock[stockIndex].quantity -= item.quantity;
  
      await this.productRepository.save(product);
    }
  
    order.sold = true;
    return this.orderRepository.save(order);
  }
}
