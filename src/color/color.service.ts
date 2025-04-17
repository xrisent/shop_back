import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Color } from './entities/color.entity';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
  ) {}

  create(createColorDto: CreateColorDto): Promise<Color> {
    const color = this.colorRepository.create(createColorDto);
    return this.colorRepository.save(color);
  }

  findAll(): Promise<Color[]> {
    return this.colorRepository.find();
  }

  findOne(id: number): Promise<Color | null> {
    return this.colorRepository.findOne({ where: { id } });
  }

  async update(id: number, updateColorDto: UpdateColorDto): Promise<Color | null> {
    await this.colorRepository.update(id, updateColorDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.colorRepository.delete(id);
  }
}