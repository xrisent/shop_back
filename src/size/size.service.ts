import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Size } from './entities/size.entity';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';

@Injectable()
export class SizeService {
  constructor(
    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
  ) {}

  create(createSizeDto: CreateSizeDto): Promise<Size> {
    const size = this.sizeRepository.create(createSizeDto);
    return this.sizeRepository.save(size);
  }

  findAll(): Promise<Size[]> {
    return this.sizeRepository.find();
  }

  findOne(id: number): Promise<Size | null> {
    return this.sizeRepository.findOne({ where: { id } });
  }

  async update(id: number, updateSizeDto: UpdateSizeDto): Promise<Size | null> {
    await this.sizeRepository.update(id, updateSizeDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.sizeRepository.delete(id);
  }
}