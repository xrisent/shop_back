import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { ProductStock } from 'src/product-stock/product-stock';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  madeIn: string;

  @ManyToOne(() => Category, category => category.products)
  category: Category;

  @Column()
  createdAt: Date;

  @Column()
  mainImage: string;

  @Column('text', { array: true })
  additionalImages: string[];

  @Column('json')
  stock: ProductStock[];
}
