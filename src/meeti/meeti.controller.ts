import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MeetiService } from './meeti.service';
import { CreateMeetiDto } from './dto/create-meeti.dto';
import { UpdateMeetiDto } from './dto/update-meeti.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('meeti')
@UseGuards(AuthGuard())
export class MeetiController {
  constructor(private readonly meetiService: MeetiService) {}

  @Post()
  create(@Body() createMeetiDto: CreateMeetiDto, @GetUser() user: User) {
    return this.meetiService.create(createMeetiDto, user);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.meetiService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.meetiService.findOne(id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMeetiDto: UpdateMeetiDto, @GetUser() user: User) {
    return this.meetiService.update(id, updateMeetiDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.meetiService.remove(+id);
  }
}
