import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  getStaticGroupImage(imageName: string) {
    const path = join(__dirname, '../../static/groups', imageName)
    if (!existsSync(path)) throw new BadRequestException('Imagen no encontrada')
    return path
  }
}
