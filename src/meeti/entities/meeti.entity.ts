import { User } from "src/auth/entities/user.entity";
import { Group } from "src/group/entities/group.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Meeti {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column('varchar', {
    nullable: false
  })
  public title: string

  @Column('varchar', {
    nullable: false
  })
  public speaker: string

  @Column('integer', {
    nullable: true
  })
  public quota: number

  @Column('text', {
    nullable: false
  })
  public description: string

  @Column('date', {
    nullable: false
  })
  public date: Date

  @Column('time', {
    nullable: false
  })
  public hour: string

  @Column('varchar', {
    nullable: false
  })
  public address: string

  @Column('varchar', {
    nullable: false
  })
  public lat: string

  @Column('varchar', {
    nullable: false
  })
  public lon: string

  @ManyToOne(
    () => User,
    (user) => user.meetis,
    { eager: true }
  )
  public user: User

  @ManyToOne(
    () => Group,
    (group) => group.meetis,
    { eager: true }
  )
  public group: Group

  @ManyToMany(() => User, (user) => user.meetis, { eager: true})
  @JoinTable()
  public users?: User[]
}
