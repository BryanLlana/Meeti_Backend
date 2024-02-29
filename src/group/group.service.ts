import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { FilesService } from 'src/files/files.service';
import { unlinkSync } from 'fs';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly fileService: FilesService
  ) {}

  async create(createGroupDto: CreateGroupDto, user: User) {
    try {
      const { category, ...groupForm  } = createGroupDto
      const categoryEntity = await this.categoryRepository.findOneBy({ id: category })
      const group = this.groupRepository.create({
        ...groupForm,
        category: categoryEntity,
        user
      })
      this.groupRepository.save(group)
      return group
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Internal Server Error')
    }
  }

  async findAll(user: User) {
    try {
      const groups = await this.groupRepository.find({
        where: {
          user
        }
      })
      return groups
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Internal Server Error')
    }
  }

  async findOne(id: string, user: User) {
    const group = await this.groupRepository.findOneBy({
      id,
      user
    })
    if (!group) throw new NotFoundException('Acción no válida')
    return group
  }

  async update(id: string, updateGroupDto: UpdateGroupDto, user: User) {
    const { category, ...groupForm  } = updateGroupDto
    const categoryEntity = await this.categoryRepository.findOneBy({ id: category })
    await this.findOne(id, user)
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

  async remove(id: string, user: User) {
    const group = await this.findOne(id, user)
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
