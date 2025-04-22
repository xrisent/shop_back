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
  oldPrice: number;

  @Column()
  madeIn: string;

  @Column()
  brand: string;

  @Column()
  material: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @Column()
  createdAt: Date;

  @Column({ type: 'varchar', nullable: true })
  mainImage: string | null;

  @Column('text', { array: true, nullable: true }) 
  additionalImages: string[] | null;

  @Column('json')
  stock: ProductStock[];
}
