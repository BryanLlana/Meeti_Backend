import { Module } from '@nestjs/common';
import { MeetiService } from './meeti.service';
import { MeetiController } from './meeti.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meeti } from './entities/meeti.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meeti])
  ],
  controllers: [MeetiController],
  providers: [MeetiService],
})
export class MeetiModule {}
