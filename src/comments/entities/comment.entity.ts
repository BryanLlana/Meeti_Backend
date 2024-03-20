import { User } from "src/auth/entities/user.entity";
import { Meeti } from "src/meeti/entities/meeti.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column('text')
  public message: string

  @Column('datetime')
  public createdAt: Date

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

  @BeforeInsert()
  updateCreatedAt() {
    this.createdAt = new Date()
  }
}


