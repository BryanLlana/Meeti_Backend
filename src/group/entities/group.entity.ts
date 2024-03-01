import { User } from "src/auth/entities/user.entity";
import { Category } from "src/category/entities/category.entity";
import { Meeti } from "src/meeti/entities/meeti.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  public id: string
  
  @Column('varchar', {
    unique: true
  })
  public title: string

  @Column('text', {
    nullable: false
  })
  public description: string

  @Column('varchar', {
    nullable: true
  })
  public website: string

  @Column('varchar', {
    nullable: true
  })
  public image: string

  @ManyToOne(
    () => Category,
    (category) => category.groups,
    { eager: true }
  )
  public category: Category

  @ManyToOne(
    () => User,
    (user) => user.groups,
    { eager: true }
  )
  public user: User

  @OneToMany(
    () => Meeti,
    (meeti) => meeti.group,
    { cascade: true }
  )
  public meetis: Meeti[]
}
