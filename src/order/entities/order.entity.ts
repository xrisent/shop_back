import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Coupon } from 'src/coupon/entities/coupon.entity';
import { OrderItem } from 'src/order-item/order-item';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.history)
  user: User;

  @Column('json')
  products: OrderItem[];

  @Column()
  createdAt: Date;

  @ManyToOne(() => Coupon, { nullable: true, onDelete: 'SET NULL' })
  coupon: Coupon | null;

  @Column()
  finalPrice: number;

  @Column()
  sold: boolean;
}
