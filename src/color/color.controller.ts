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
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuth } from 'src/auth/auth.decorator';

@ApiTags('Colors')
@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}
  @JwtAuth()
  @Post()
  @ApiOperation({ summary: 'Создать цвет' })
  @ApiBody({ type: CreateColorDto })
  @ApiResponse({ status: 201, description: 'Цвет успешно создан' })
  create(@Body() dto: CreateColorDto) {
    return this.colorService.create(dto);
  }
  @JwtAuth()
  @Get()
  @ApiOperation({ summary: 'Получить список всех цветов' })
  @ApiResponse({ status: 200, description: 'Список цветов получен' })
  findAll() {
    return this.colorService.findAll();
  }
  @JwtAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Получить цвет по ID' })
  @ApiParam({ name: 'id', description: 'ID цвета' })
  @ApiResponse({ status: 200, description: 'Цвет найден' })
  @ApiResponse({ status: 404, description: 'Цвет не найден' })
  findOne(@Param('id') id: string) {
    return this.colorService.findOne(+id);
  }
  @JwtAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Обновить цвет по ID' })
  @ApiParam({ name: 'id', description: 'ID цвета' })
  @ApiBody({ type: UpdateColorDto })
  @ApiResponse({ status: 200, description: 'Цвет успешно обновлен' })
  update(@Param('id') id: string, @Body() dto: UpdateColorDto) {
    return this.colorService.update(+id, dto);
  }
  @JwtAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить цвет по ID' })
  @ApiParam({ name: 'id', description: 'ID цвета' })
  @ApiResponse({ status: 200, description: 'Цвет успешно удален' })
  remove(@Param('id') id: string) {
    return this.colorService.remove(+id);
  }
}