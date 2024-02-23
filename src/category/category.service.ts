import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ){}

  async create(createCategoryDto: CreateCategoryDto) {
    const categoryExists = await this.categoryRepository.findBy({
      name: createCategoryDto.name
    })
    if (categoryExists.length > 0) throw new BadRequestException('Categoría existente')

    try {
      const category = this.categoryRepository.create(createCategoryDto)
      await this.categoryRepository.save(category)
      return category
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Internal Server Error')
    }
  }

  async findAll() {
    try {
      const categories = await this.categoryRepository.find()
      return categories
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Internal Server Error')
    }
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findBy({ id })
    if (category.length === 0) throw new NotFoundException('Categoría inexistente')
    return category
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id)
    try {
    } catch (error) {
      
    }
  }

  async remove(id: number) {
    const category = await this.findOne(id)
    try {
      await this.categoryRepository.remove(category)
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Internal Server Error')
    }
  }
}
