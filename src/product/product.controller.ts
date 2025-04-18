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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Product')
@ApiBearerAuth()
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: 'Создать продукт' })
  @ApiResponse({ status: 201, description: 'Продукт успешно создан' })
  @ApiBody({ type: CreateProductDto })
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ summary: 'Получить список всех продуктов' })
  @ApiResponse({ status: 200, description: 'Список продуктов' })
  findAll() {
    return this.productService.findAll();
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiOperation({ summary: 'Получить один продукт по ID' })
  @ApiParam({ name: 'id', description: 'ID продукта', type: Number })
  @ApiResponse({ status: 200, description: 'Продукт найден' })
  @ApiResponse({ status: 404, description: 'Продукт не найден' })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @ApiOperation({ summary: 'Обновить продукт по ID' })
  @ApiParam({ name: 'id', description: 'ID продукта', type: Number })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ status: 200, description: 'Продукт обновлён' })
  @ApiResponse({ status: 404, description: 'Продукт не найден' })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productService.update(+id, dto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить продукт по ID' })
  @ApiParam({ name: 'id', description: 'ID продукта', type: Number })
  @ApiResponse({ status: 200, description: 'Продукт удалён' })
  @ApiResponse({ status: 404, description: 'Продукт не найден' })
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
