// src/order/order.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Coupon } from 'src/coupon/entities/coupon.entity';
import { Product } from 'src/product/entities/product.entity';
import { Color } from 'src/color/entities/color.entity';
import { Size } from 'src/size/entities/size.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.history)
  user: User;

  @Column("simple-array")
  products: {
    product: Product;
    color: Color;
    size: Size;
    quantity: number;
  }[];

  @Column()
  createdAt: Date;

  @ManyToOne(() => Coupon, (coupon) => coupon.orders)
  coupon: Coupon;

  @Column()
  finalPrice: number;
}
