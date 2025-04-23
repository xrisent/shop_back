import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product]), ProductModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService]
})
export class OrderModule {}
