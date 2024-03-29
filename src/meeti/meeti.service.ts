import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMeetiDto } from './dto/create-meeti.dto';
import { UpdateMeetiDto } from './dto/update-meeti.dto';
import { User } from 'src/auth/entities/user.entity';
import { LessThan, MoreThan, Not, Repository } from 'typeorm';
import { Group } from 'src/group/entities/group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Meeti } from './entities/meeti.entity';
import { OptionDto } from '../common/dto/option.dto';

@Injectable()
export class MeetiService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(Meeti)
    private readonly meetiRepository: Repository<Meeti>
  ) { }

  async create(createMeetiDto: CreateMeetiDto, user: User) {
    try {
      const { group, ...valuesMeeti } = createMeetiDto
      const groupEntity = await this.groupRepository.findOneBy({ id: group })
      const meeti = this.meetiRepository.create({
        ...valuesMeeti,
        group: groupEntity,
        user
      })
      await this.meetiRepository.save(meeti)
      return meeti
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Internal Server Error')
    }
  }

  async register(id: string, user: User) {
    const meeti = await this.findOnePublic(id)
    if (meeti.users.some(us => us.id === user.id)) {
      meeti.users = meeti.users.filter(us => us.id !== user.id)
    } else {
      meeti.users.push(user)
    }

    try {
      await this.meetiRepository.save(meeti)
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Internal Server Error')
    }
  }

  async findAll(user: User) {
    try {
      const dateNow = new Date()
      dateNow.setHours(0, 0, 0, 0)
      const [meetisNext, meetisPrevious] = await Promise.all([this.meetiRepository.find({
        where: {
          user,
          date: MoreThan(dateNow)
        },
        order: {
          date: 'ASC'
        }
      }),
      this.meetiRepository.find({
        where: {
          user,
          date: LessThan(dateNow)
        },
        order: {
          date: 'DESC'
        }
      })])

      return {
        meetisNext,
        meetisPrevious
      }
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Internal Server Error')
    }
  }

  async findAllPublic(option: OptionDto) {
    if (option.limit) {
      try {
        const dateNow = new Date()
        dateNow.setHours(0, 0, 0, 0)
        const meetis = await this.meetiRepository.find({
          where: {
            date: MoreThan(dateNow)
          },
          order: {
            date: 'ASC'
          },
          take: option.limit
        })
        return meetis
      } catch (error) {
        console.log(error)
      }
    } else if (option.category) {
      try {
        const dateNow = new Date()
        dateNow.setHours(0, 0, 0, 0)
        const meetis = await this.meetiRepository.createQueryBuilder('meeti')
          .leftJoinAndSelect('meeti.group', 'group')
          .leftJoin('group.category', 'category')
          .leftJoinAndSelect('meeti.user', 'user')
          .where('category.id = :categoryId', { categoryId: option.category })
          .andWhere('meeti.date > :dateNow', { dateNow }) // Filtrar por fecha actual
          .orderBy('meeti.date', 'ASC') // Ordenar ascendentemente por fecha
          .getMany();
        return meetis
      } catch (error) {
        console.log(error)
      }
    }
    try {
      const dateNow = new Date()
      dateNow.setHours(0, 0, 0, 0)
      const meetis = await this.meetiRepository.find({
        where: {
          date: MoreThan(dateNow)
        },
        order: {
          date: 'ASC'
        }
      })
      return meetis
    } catch (error) {
      console.log(error)
    }
  }

  async findOne(id: string, user: User) {
    const meeti = await this.meetiRepository.findOneBy({
      id,
      user
    })
    if (!meeti) throw new NotFoundException('Acción no válida')
    return meeti
  }

  async findOnePublic(id: string) {
    const meeti = await this.meetiRepository.findOneBy({
      id
    })
    if (!meeti) throw new NotFoundException('Meeti inexistente')
    return meeti
  }

  async update(id: string, updateMeetiDto: UpdateMeetiDto, user: User) {
    await this.findOne(id, user)
    const { group, ...meetiForm } = updateMeetiDto
    const groupEntity = await this.groupRepository.findOneBy({ id: group })
    const meeti = await this.meetiRepository.preload({
      id,
      ...meetiForm,
      group: groupEntity
    })

    try {
      await this.meetiRepository.save(meeti)
      return meeti
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Internal Server Error')
    }
  }

  async remove(id: string, user: User) {
    const meeti = await this.findOne(id, user)

    try {
      await this.meetiRepository.remove(meeti)
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Internal Server Error')
    }
  }
}
