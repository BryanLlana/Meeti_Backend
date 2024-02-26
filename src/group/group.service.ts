import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { FilesService } from 'src/files/files.service';
import { unlinkSync } from 'fs';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly fileService: FilesService
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    try {
      const { category, ...groupForm  } = createGroupDto
      const categoryEntity = await this.categoryRepository.findOneBy({ id: category })
      const group = this.groupRepository.create({
        ...groupForm,
        category: categoryEntity
      })
      this.groupRepository.save(group)
      return group
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Internal Server Error')
    }
  }

  async findAll() {
    try {
      const groups = await this.groupRepository.find()
      return groups
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Internal Server Error')
    }
  }

  async findOne(id: string) {
    const group = await this.groupRepository.findOneBy({ id })
    if (!group) throw new NotFoundException('Grupo inexistente')
    return group
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    const { category, ...groupForm  } = updateGroupDto
    const categoryEntity = await this.categoryRepository.findOneBy({ id: category })
    const grupo = await this.groupRepository.preload({
      id,
      ...groupForm,
      category: categoryEntity
    })

    try {
      await this.groupRepository.save(grupo)
      return grupo
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Internal Server Error')
    }
  }

  async remove(id: string) {
    const group = await this.findOne(id)
    const path = this.fileService.getStaticGroupImage(group.image)
    unlinkSync(path)
    try {
      await this.groupRepository.remove(group)
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Internal Server Error')
    }
  }
}
