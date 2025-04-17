import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
  
    if (createCategoryDto.parentId) {
      return this.categoryRepository.findOne({
        where: { id: createCategoryDto.parentId },
      }).then(parentCategory => {
        if (parentCategory) {
          category.parent = parentCategory;
        }
        return this.categoryRepository.save(category);
      });
    }
  
    return this.categoryRepository.save(category);
  }

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find({ relations: ['products', 'children', 'parent'] });
  }

  findOne(id: number): Promise<Category | null> {
    return this.categoryRepository.findOne({ where: { id }, relations: ['products', 'children', 'parent'] });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category | null> {
    await this.categoryRepository.update(id, updateCategoryDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}