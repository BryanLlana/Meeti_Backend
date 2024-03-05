import { Module } from '@nestjs/common';
import { MeetiService } from './meeti.service';
import { MeetiController } from './meeti.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meeti } from './entities/meeti.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Group } from 'src/group/entities/group.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meeti, Group]),
    AuthModule
  ],
  controllers: [MeetiController],
  providers: [MeetiService],
})
export class MeetiModule {}
