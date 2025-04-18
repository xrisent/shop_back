import { Module, forwardRef } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from './entities/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Coupon } from 'src/coupon/entities/coupon.entity';
import { ProductModule } from 'src/product/product.module';
import { CouponModule } from 'src/coupon/coupon.module';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.entity';
import { ColorModule } from 'src/color/color.module';
import { SizeModule } from 'src/size/size.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, Coupon, Product, User]),
    ProductModule,
    CouponModule,
    ColorModule,
    SizeModule,
    forwardRef(() => UserModule)
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}