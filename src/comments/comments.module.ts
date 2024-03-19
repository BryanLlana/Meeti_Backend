import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Meeti } from 'src/meeti/entities/meeti.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, Meeti]),
    AuthModule
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
