import { Injectable } from '@nestjs/common';
import { CreateMeetiDto } from './dto/create-meeti.dto';
import { UpdateMeetiDto } from './dto/update-meeti.dto';

@Injectable()
export class MeetiService {
  create(createMeetiDto: CreateMeetiDto) {
    return 'This action adds a new meeti';
  }

  findAll() {
    return `This action returns all meeti`;
  }

  findOne(id: number) {
    return `This action returns a #${id} meeti`;
  }

  update(id: number, updateMeetiDto: UpdateMeetiDto) {
    return `This action updates a #${id} meeti`;
  }

  remove(id: number) {
    return `This action removes a #${id} meeti`;
  }
}
