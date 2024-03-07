import { IsEnum, IsOptional, IsString } from "class-validator";

export class OptionDto {
  @IsOptional() @IsString()
  @IsEnum(['true'])
  public option: string
}