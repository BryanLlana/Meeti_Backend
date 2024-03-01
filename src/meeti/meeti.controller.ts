import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MeetiService } from './meeti.service';
import { CreateMeetiDto } from './dto/create-meeti.dto';
import { UpdateMeetiDto } from './dto/update-meeti.dto';

@Controller('meeti')
export class MeetiController {
  constructor(private readonly meetiService: MeetiService) {}

  @Post()
  create(@Body() createMeetiDto: CreateMeetiDto) {
    return this.meetiService.create(createMeetiDto);
  }

  @Get()
  findAll() {
    return this.meetiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meetiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMeetiDto: UpdateMeetiDto) {
    return this.meetiService.update(+id, updateMeetiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.meetiService.remove(+id);
  }
}
