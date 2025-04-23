import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from 'src/category/entities/category.entity';
import { Color } from 'src/color/entities/color.entity';
import { Size } from 'src/size/entities/size.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(Color)
    private colorRepository: Repository<Color>,

    @InjectRepository(Size)
    private sizeRepository: Repository<Size>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { categoryId, stock, ...rest } = createProductDto;
  
    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
    if (!category) throw new NotFoundException(`Category with ID ${categoryId} not found`);
  
    const now = new Date();
    const bishkekOffsetMs = 6 * 60 * 60 * 1000;
    const bishkekTime = new Date(now.getTime() + bishkekOffsetMs);
  
    const resolvedStock = await Promise.all(
      stock.map(async (item) => {
        const color = await this.colorRepository.findOne({ where: { id: item.colorId } });
        if (!color) throw new NotFoundException(`Color with ID ${item.colorId} not found`);
  
        const size = await this.sizeRepository.findOne({ where: { id: item.sizeId } });
        if (!size) throw new NotFoundException(`Size with ID ${item.sizeId} not found`);
  
        return {
          color,
          size,
          quantity: item.quantity,
        };
      })
    );
  
    const product = this.productRepository.create({
      ...rest,
      createdAt: bishkekTime,
      category,
      mainImage: rest.mainImage || null,
      additionalImages: rest.additionalImages || [],
      stock: resolvedStock,
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
