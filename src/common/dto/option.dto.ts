import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class OptionDto {
  @IsOptional() @IsNumber()
  @Type(() => Number)
  public limit: number
}