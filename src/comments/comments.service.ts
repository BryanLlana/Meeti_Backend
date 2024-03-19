import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
