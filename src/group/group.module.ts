import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Category } from 'src/category/entities/category.entity';
import { FilesModule } from 'src/files/files.module';
import { AuthModule } from 'src/auth/auth.module';
import { Meeti } from 'src/meeti/entities/meeti.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group, Category, Meeti]),
    FilesModule,
    AuthModule
  ],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
