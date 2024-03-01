import { PartialType } from '@nestjs/mapped-types';
import { CreateMeetiDto } from './create-meeti.dto';

export class UpdateMeetiDto extends PartialType(CreateMeetiDto) {}
