import { IsEmail, IsString } from "class-validator"

export class LoginUserDto {
  @IsString() @IsEmail()
  public readonly email: string

  @IsString()
  public readonly password: string
}
