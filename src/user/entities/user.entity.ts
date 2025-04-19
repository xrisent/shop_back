import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import { Order } from 'src/order/entities/order.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  number: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  password: string;

  @OneToMany(() => Order, (order) => order.user)
  history: Order[];

  @OneToOne(() => Cart, (cart) => cart.user)
  @JoinColumn()
  cart: Cart;

  @Column('int', { array: true, default: [] })
  favorites: number[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}
