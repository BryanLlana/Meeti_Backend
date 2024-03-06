import { Group } from "src/group/entities/group.entity";
import { Meeti } from "src/meeti/entities/meeti.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string
  @Column('varchar')
  public name: string
  @Column('varchar', {
    nullable: true
  })
  public image: string
  @Column('varchar', {
    unique: true
  })
  public email: string
  @Column('varchar')
  public password: string
  @Column('varchar', {
    nullable: true,
    default: ''
  })
  public description: string
  @Column('bool', {
    default: true
  })
  public active: boolean
  @Column('varchar', {
    nullable: true
  })
  public token: string

  @OneToMany(
    () => Group,
    (group) => group.user,
    { cascade: true }
  )
  public groups?: Group[]

  @OneToMany(
    () => Meeti,
    (meeti) => meeti.user,
    { cascade: true }
  )
  public meetis?: Meeti[]

  @ManyToMany(() => Meeti, (meeti) => meeti.users)
  public meetisUser?: Meeti[]

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.trim().toLowerCase()
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert()
  }
}
