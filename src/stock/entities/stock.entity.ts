// src/stock/stock.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Color } from 'src/color/entities/color.entity';
import { Size } from 'src/size/entities/size.entity';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.stock)
  product: Product;

  @ManyToOne(() => Color)
  color: Color;

  @ManyToOne(() => Size)
  size: Size;

  @Column()
  quantity: number;
}
