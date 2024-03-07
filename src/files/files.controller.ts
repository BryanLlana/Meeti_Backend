import { BadRequestException, Controller, Get, Param, Patch, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers/fileNamer';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { unlinkSync } from 'fs';

@Controller('files')
export class FilesController {
  constructor(
    private readonly configService: ConfigService,
    private readonly filesService: FilesService
  ) {}

  @Get('group/:imageName')
  findImageGroup(@Res() res: Response, @Param('imageName') imageName: string) {
    const path = this.filesService.getStaticGroupImage(imageName)
    res.sendFile(path)
  }

  @Post('group')
  @UseInterceptors(FileInterceptor('image', {
    fileFilter: fileFilter,
    storage: diskStorage({
      destination: './static/groups',
      filename: fileNamer
    })
  }))
  uploadImageGroup(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('Imagen no subida')
    const secureUrl = `${this.configService.get('HOST_API')}/files/group/${file.filename}`
    return {
      secureUrl,
      fileName: file.filename
    }
  }

  @Patch('group/:imageName')
  @UseInterceptors(FileInterceptor('image', {
    fileFilter: fileFilter,
    storage: diskStorage({
      destination: './static/groups',
      filename: fileNamer
    })
  }))
  updateImageGroup(@UploadedFile() file: Express.Multer.File, @Param('imageName') imageName: string) {
    const path = this.filesService.getStaticGroupImage(imageName)
    if (!file) throw new BadRequestException('Imagen no subida')
    const secureUrl = `${this.configService.get('HOST_API')}/files/group/${file.filename}`
    unlinkSync(path)
    return {
      secureUrl,
      fileName: file.filename
    }
  }

  @Get('profile/:imageName')
  findImageUser(@Res() res: Response, @Param('imageName') imageName: string) {
    const path = this.filesService.getStaticUserImage(imageName)
    res.sendFile(path)
  }

  @Post('profile')
  @UseInterceptors(FileInterceptor('image', {
    fileFilter: fileFilter,
    storage: diskStorage({
      destination: './static/users',
      filename: fileNamer
    })
  }))
  uploadImageUser(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('Imagen no subida')
    const secureUrl = `${this.configService.get('HOST_API')}/files/profile/${file.filename}`
    return {
      secureUrl,
      fileName: file.filename
    }
  }

  @Patch('profile/:imageName')
  @UseInterceptors(FileInterceptor('image', {
    fileFilter: fileFilter,
    storage: diskStorage({
      destination: './static/users',
      filename: fileNamer
    })
  }))
  updateImageUser(@UploadedFile() file: Express.Multer.File, @Param('imageName') imageName: string) {
    const path = this.filesService.getStaticUserImage(imageName)
    if (!file) throw new BadRequestException('Imagen no subida')
    const secureUrl = `${this.configService.get('HOST_API')}/files/profile/${file.filename}`
    unlinkSync(path)
    return {
      secureUrl,
      fileName: file.filename
    }
  }
}
