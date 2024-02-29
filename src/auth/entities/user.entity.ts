import { Group } from "src/group/entities/group.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
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

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.trim().toLowerCase()
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert()
  }
}
