import { IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  public readonly name: string
  @IsString()
  @IsOptional()
  public readonly description: string
  @IsString()
  public readonly email: string
  @IsString() 
  @IsOptional()
  public readonly image: string
}
