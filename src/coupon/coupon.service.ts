import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon } from './entities/coupon.entity';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
  ) {}

  create(createCouponDto: CreateCouponDto): Promise<Coupon> {
    const coupon = this.couponRepository.create(createCouponDto);
    return this.couponRepository.save(coupon);
  }

  findAll(): Promise<Coupon[]> {
    return this.couponRepository.find();
  }

  findOne(id: number): Promise<Coupon | null> {
    return this.couponRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateCouponDto: UpdateCouponDto,
  ): Promise<Coupon | null> {
    await this.couponRepository.update(id, updateCouponDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.couponRepository.delete(id);
  }
}
