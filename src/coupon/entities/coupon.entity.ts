import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
