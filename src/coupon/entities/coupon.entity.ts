// src/coupon/coupon.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from 'src/order/entities/order.entity';

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  coupon: string;

  @Column()
  discount: number;

  @Column()
  used: boolean;

  @OneToMany(() => Order, (order) => order.coupon)
  orders: Order[];
}
