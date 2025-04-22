import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { categoryId, ...rest } = createProductDto;
  
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
  
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }
  
    const now = new Date();
    const bishkekOffsetMs = 6 * 60 * 60 * 1000; 
    const bishkekTime = new Date(now.getTime() + bishkekOffsetMs);
  
    const product = this.productRepository.create({
      ...rest,
      createdAt: bishkekTime,
      category,
      mainImage: rest.mainImage || null,
      additionalImages: rest.additionalImages || [],
    });
  
    return this.productRepository.save(product);
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['category', 'category.parent', 'category.children'],
    });
  }

  findOne(id: number): Promise<Product | null> {
    return this.productRepository.findOne({
      where: { id },
      relations: ['category', 'category.parent', 'category.children'],
    });
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product | null> {
    await this.productRepository.update(id, updateProductDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
