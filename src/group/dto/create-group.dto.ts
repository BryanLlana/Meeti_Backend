import { IsNumber, IsString, IsUrl, IsOptional } from "class-validator"

export class CreateGroupDto {
  @IsString()
  public readonly title: string
  @IsString()
  public readonly description: string
  @IsNumber()
  public readonly category: number
  @IsOptional() @IsString()
  public readonly website: string
  @IsString()
  public readonly image: string
}
