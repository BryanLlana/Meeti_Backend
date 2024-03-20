import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}


  @Post(':idMeeti')
  @UseGuards(AuthGuard())
  create(
    @Body() createCommentDto: CreateCommentDto, 
    @Param('idMeeti', ParseUUIDPipe) id: string,
    @GetUser() user: User  
  ) {
    return this.commentsService.create(createCommentDto, id, user);
  }

  @Get(':idMeeti')
  get(@Param('idMeeti', ParseUUIDPipe) id: string) {
    return this.commentsService.find(id)
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: User) {
    return this.commentsService.remove(id, user);
  }
}
