import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
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
  ApiConsumes,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { multerConfig } from 'src/config/multer.config';
import { Multer } from 'multer';
import { JwtAuth } from 'src/auth/auth.decorator';

@ApiTags('Product')
@ApiBearerAuth()
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @JwtAuth()
  @Post()
  @ApiOperation({ summary: 'Создать продукт' })
  @ApiResponse({ status: 201, description: 'Продукт успешно создан' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Создание продукта с изображениями',
    type: CreateProductDto,
  })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'mainImage', maxCount: 1 },
        { name: 'additionalImages', maxCount: 9 },
      ],
      multerConfig,
    ),
  )
  async create(
    @Body() dto: any,
    @UploadedFiles()
    files: {
      mainImage?: Express.Multer.File[];
      additionalImages?: Express.Multer.File[];
    },
  ) {
    const mainImage = files.mainImage?.[0]?.filename || null;
    const additionalImages =
      files.additionalImages?.map((file) => file.filename) || [];
  
    let parsedStock: any[] = [];
  
    try {
      if (typeof dto.stock === 'string') {
        const parsed = JSON.parse(dto.stock);
        parsedStock = Array.isArray(parsed) ? parsed : [parsed];
      } else if (Array.isArray(dto.stock)) {
        parsedStock = dto.stock;
      } else if (typeof dto.stock === 'object' && dto.stock !== null) {
        parsedStock = [dto.stock];
      } else {
        throw new Error();
      }
    } catch {
      throw new BadRequestException('Невалидный формат stock. Ожидается JSON-объект или массив объектов.');
    }
  
    return this.productService.create({
      ...dto,
      mainImage,
      additionalImages,
      stock: parsedStock,
    });
  }
  @JwtAuth()
  @Get()
  @ApiOperation({ summary: 'Получить список всех продуктов' })
  @ApiResponse({ status: 200, description: 'Список продуктов' })
  findAll() {
    return this.productService.findAll();
  }
  @JwtAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Получить один продукт по ID' })
  @ApiParam({ name: 'id', description: 'ID продукта', type: Number })
  @ApiResponse({ status: 200, description: 'Продукт найден' })
  @ApiResponse({ status: 404, description: 'Продукт не найден' })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }
  @JwtAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Обновить продукт по ID' })
  @ApiParam({ name: 'id', description: 'ID продукта', type: Number })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ status: 200, description: 'Продукт обновлён' })
  @ApiResponse({ status: 404, description: 'Продукт не найден' })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productService.update(+id, dto);
  }
  @JwtAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить продукт по ID' })
  @ApiParam({ name: 'id', description: 'ID продукта', type: Number })
  @ApiResponse({ status: 200, description: 'Продукт удалён' })
  @ApiResponse({ status: 404, description: 'Продукт не найден' })
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
