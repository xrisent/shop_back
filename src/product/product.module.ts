import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from 'src/category/entities/category.entity';
import { CategoryModule } from 'src/category/category.module';
import { Color } from 'src/color/entities/color.entity';
import { Size } from 'src/size/entities/size.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Color, Size]), CategoryModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
