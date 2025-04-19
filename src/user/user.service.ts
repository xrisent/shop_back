import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly cartService: CartService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);

    const createCartDto = {
      userId: user.id,
      content: [],
      couponId: undefined, 
      price: 0, 
      couponPrice: 0
    };

    const cart = await this.cartService.create(createCartDto);

    // Связываем пользователя с корзиной
    user.cart = cart;
    await this.userRepository.save(user);

    return user;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['history', 'cart'] });
  }
  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['history', 'cart', 'favorites'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}