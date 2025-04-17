import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { SizeService } from './size.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';

@ApiTags('Size')
@Controller('size')
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  @Post()
  @ApiOperation({ summary: 'Создать размер' })
  @ApiBody({ type: CreateSizeDto })
  @ApiResponse({ status: 201, description: 'Размер успешно создан' })
  create(@Body() dto: CreateSizeDto) {
    return this.sizeService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все размеры' })
  @ApiResponse({ status: 200, description: 'Список размеров' })
  findAll() {
    return this.sizeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить размер по ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Размер найден' })
  @ApiResponse({ status: 404, description: 'Размер не найден' })
  findOne(@Param('id') id: string) {
    return this.sizeService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить размер по ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateSizeDto })
  @ApiResponse({ status: 200, description: 'Размер обновлён' })
  update(@Param('id') id: string, @Body() dto: UpdateSizeDto) {
    return this.sizeService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить размер по ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Размер удалён' })
  remove(@Param('id') id: string) {
    return this.sizeService.remove(+id);
  }
}