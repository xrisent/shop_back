// src/user/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany } from 'typeorm';
import { Order } from 'src/order/entities/order.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Product } from 'src/product/entities/product.entity';

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

  @OneToMany(() => Order, (order) => order.user)
  history: Order[];

  @ManyToOne(() => Cart, (cart) => cart.user)
  cart: Cart;

  @ManyToMany(() => Product, (product) => product.favorites)
  favorites: Product[];
}
