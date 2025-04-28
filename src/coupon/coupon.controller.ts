import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuth } from 'src/auth/auth.decorator';

@ApiTags('Coupons')
@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}
  @JwtAuth()
  @Post()
  @ApiOperation({ summary: 'Создать купон' })
  @ApiBody({ type: CreateCouponDto })
  @ApiResponse({ status: 201, description: 'Купон успешно создан' })
  create(@Body() dto: CreateCouponDto) {
    return this.couponService.create(dto);
  }
  @JwtAuth()
  @Get()
  @ApiOperation({ summary: 'Получить список всех купонов' })
  @ApiResponse({ status: 200, description: 'Список купонов' })
  findAll() {
    return this.couponService.findAll();
  }
  @JwtAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Получить купон по ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Найденный купон' })
  @ApiResponse({ status: 404, description: 'Купон не найден' })
  findOne(@Param('id') id: string) {
    return this.couponService.findOne(+id);
  }
  @JwtAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Обновить купон по ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateCouponDto })
  @ApiResponse({ status: 200, description: 'Купон успешно обновлён' })
  @ApiResponse({ status: 404, description: 'Купон не найден' })
  update(@Param('id') id: string, @Body() dto: UpdateCouponDto) {
    return this.couponService.update(+id, dto);
  }
  @JwtAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить купон по ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Купон успешно удалён' })
  @ApiResponse({ status: 404, description: 'Купон не найден' })
  remove(@Param('id') id: string) {
    return this.couponService.remove(+id);
  }
}
