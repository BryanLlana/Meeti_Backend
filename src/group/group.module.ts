import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Category } from 'src/category/entities/category.entity';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group, Category]),
    FilesModule
  ],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
