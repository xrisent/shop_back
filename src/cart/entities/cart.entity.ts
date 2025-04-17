import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Coupon } from 'src/coupon/entities/coupon.entity';
import { CartItem } from 'src/cart-item/cart-item';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, user => user.cart)
  user: User;

  @ManyToOne(() => Coupon, { nullable: true, onDelete: 'SET NULL' })
  coupon: Coupon; 

  @Column()
  price: number;

  @Column()
  couponPrice: number;

  @Column('json')
  content: CartItem[];
}