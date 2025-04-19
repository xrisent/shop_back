import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { CategoryModule } from './category/category.module';
import { ColorModule } from './color/color.module';
import { SizeModule } from './size/size.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { CouponModule } from './coupon/coupon.module';
import { CartModule } from './cart/cart.module';
import { Category } from './category/entities/category.entity';
import { Color } from './color/entities/color.entity';
import { Size } from './size/entities/size.entity';
import { Product } from './product/entities/product.entity';
import { Order } from './order/entities/order.entity';
import { User } from './user/entities/user.entity';
import { Coupon } from './coupon/entities/coupon.entity';
import { Cart } from './cart/entities/cart.entity';
import { CartItem } from './cart-item/cart-item';
import { OrderItem } from './order-item/order-item';
import { ProductStock } from './product-stock/product-stock';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: process.env.DB_HOST, 
      port: parseInt(process.env.DB_PORT || '5432'), 
      username: process.env.DB_USERNAME, 
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,  
      entities: [Category, Color, Size, Product, Order, User, Coupon, Cart, CartItem, OrderItem, ProductStock],
      synchronize: true, 
    }),
    TypeOrmModule.forFeature([Category, Color, Size, Product, Order, User, Coupon, Cart, CartItem, OrderItem, ProductStock]),
    CategoryModule,
    ColorModule,
    SizeModule,
    ProductModule,
    OrderModule,
    UserModule,
    CouponModule,
    CartModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
