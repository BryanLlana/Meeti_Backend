import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class OptionDto {
  @IsOptional() @IsNumber()
  @Type(() => Number)
  public limit: number
  @IsOptional() @IsNumber()
  @Type(() => Number)
  public category: string
}