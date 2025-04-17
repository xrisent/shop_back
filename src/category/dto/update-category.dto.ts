import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { ApiExtraModels } from '@nestjs/swagger';

@ApiExtraModels(CreateCategoryDto)
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
