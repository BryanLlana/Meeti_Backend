import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createGroupDto: CreateGroupDto, @GetUser() user: User) {
    return this.groupService.create(createGroupDto, user);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll(@GetUser() user: User) {
    return this.groupService.findAll(user);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: User) {
    return this.groupService.findOne(id, user);
  }

  @Get('public/:id')
  findOnePublic(@Param('id') id: string) {
    return this.groupService.findOnePublic(id)
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateGroupDto: UpdateGroupDto,
    @GetUser() user: User
  ) {
    return this.groupService.update(id, updateGroupDto, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: User) {
    return this.groupService.remove(id, user);
  }
}
