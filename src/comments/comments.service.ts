import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Meeti } from 'src/meeti/entities/meeti.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Meeti)
    private readonly meetiRepository: Repository<Meeti>
  ){}

  async create(createCommentDto: CreateCommentDto, id: string, user: User) {
    try {
      const meeti = await this.meetiRepository.findOneBy({ id })
      const comment = this.commentRepository.create({
        message: createCommentDto.message,
        meeti,
        user
      })
      await this.commentRepository.save(comment)
      return comment
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Internal Server Error')
    }
  }

  async find(id: string) {
    const meeti = await this.meetiRepository.findOneBy({ id })
    return this.commentRepository.find({
      where: {
        meeti
      },
      order: {
        createdAt: 'ASC'
      }
    })
  }

  async remove(id: string, user: User) {
    const comment = await this.commentRepository.findOneBy({ id })
    if (!comment) throw new NotFoundException('Comentario inexistente')
    if (comment.user.id !== user.id) throw new UnauthorizedException('Acción no válida')
    try {
      await this.commentRepository.remove(comment)
    } catch (error) {
      console.log(error)
    }
  }
}
