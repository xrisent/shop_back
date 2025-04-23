import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CartService } from 'src/cart/cart.service';
import { Order } from 'src/order/entities/order.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly cartService: CartService,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);

    const cart = await this.cartService.createForUser(user.id);
    
    user.cart = cart;
    await this.userRepository.save(user);

    return user;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['history', 'cart'] });
  }
  findOne(id: number): Promise<User | null> {
    console.log(id)
    return this.userRepository.findOne({
      where: { id },
      relations: ['history', 'cart'],
    });
  }

  findOneEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async addOrderToUser(userId: number, orderId: number): Promise<Order> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['history'],
    });
    if (!user) throw new Error('User not found');

    const order = await this.orderRepository.findOne({ where: { id: orderId } });
    if (!order) throw new Error('Order not found');

    order.user = user;
    return await this.orderRepository.save(order);
  }
}