import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'
import { GroupModule } from './group/group.module';
import { CategoryModule } from './category/category.module';
import { CommonModule } from './common/common.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { MeetiModule } from './meeti/meeti.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true
    }),
    GroupModule,
    CategoryModule,
    CommonModule,
    FilesModule,
    AuthModule,
    MeetiModule,
    CommentsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
