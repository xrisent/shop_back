// src/cart/cart.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Coupon } from 'src/coupon/entities/coupon.entity';
import { Color } from 'src/color/entities/color.entity';
import { Size } from 'src/size/entities/size.entity';
import { Product } from 'src/product/entities/product.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.cart)
  user: User;

  @ManyToOne(() => Coupon, (coupon) => coupon.orders)
  coupon: Coupon;

  @Column()
  price: number;

  @Column()
  couponPrice: number;

  @Column("simple-array")
  content: {
    product: Product;
    color: Color;
    size: Size;
    quantity: number;
  }[];
}
