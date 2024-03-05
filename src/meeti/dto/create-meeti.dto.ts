import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMeetiDto {
  @IsString()
  public readonly title: string
  @IsString()
  public readonly speaker: string
  @IsOptional() @IsNumber()
  public readonly quota: number
  @IsString()
  public readonly description: string
  @IsString()
  public readonly date: string
  @IsString()
  public readonly hour: string
  @IsString()
  public readonly address: string
  @IsString()
  public readonly lat: string
  @IsString()
  public readonly lon: string
  @IsString()
  public readonly group: string
}
