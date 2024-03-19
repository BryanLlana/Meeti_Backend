import { User } from "src/auth/entities/user.entity";
import { Meeti } from "src/meeti/entities/meeti.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  public id: number

  @Column('text')
  public message: string

  @ManyToOne(
    () => User,
    (user) => user.comments,
    { eager: true }
  )
  public user: User

  @ManyToOne(
    () => Meeti,
    (meeti) => meeti.comments
  )
  public meeti: Meeti
}


