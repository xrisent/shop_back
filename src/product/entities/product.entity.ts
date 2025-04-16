// src/product/product.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Stock } from 'src/stock/entities/stock.entity';
import { User } from 'src/user/entities/user.entity';

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

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToMany(() => Stock, (stock) => stock.product)
  stock: Stock[];

  @Column()
  createdAt: Date;

  @Column()
  mainImage: string;

  @Column("simple-array")
  additionalImages: string[];

  @ManyToMany(() => User, (user) => user.favorites)
  favorites: User[];
}
