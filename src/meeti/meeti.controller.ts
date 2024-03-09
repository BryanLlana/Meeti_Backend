import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { MeetiService } from './meeti.service';
import { CreateMeetiDto } from './dto/create-meeti.dto';
import { UpdateMeetiDto } from './dto/update-meeti.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { OptionDto } from 'src/common/dto/option.dto';

@Controller('meeti')
export class MeetiController {
  constructor(private readonly meetiService: MeetiService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createMeetiDto: CreateMeetiDto, @GetUser() user: User) {
    return this.meetiService.create(createMeetiDto, user);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll(@GetUser() user: User) {
    return this.meetiService.findAll(user);
  }

  @Get('public')
  findAllPublic(@Query() option: OptionDto) {
    return this.meetiService.findAllPublic(option);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.meetiService.findOne(id, user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(@Param('id') id: string, @Body() updateMeetiDto: UpdateMeetiDto, @GetUser() user: User) {
    return this.meetiService.update(id, updateMeetiDto, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.meetiService.remove(id, user);
  }
}
