import { IsString } from "class-validator";

export class CreateCommentDto {
  @IsString()
  public readonly message: string
}
