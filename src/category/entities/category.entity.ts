import { Group } from "src/group/entities/group.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
  @PrimaryGeneratedColumn('increment')
  public id: number

  @Column('varchar', {
    unique: true
  })
  public name: string

  @OneToMany(
    () => Group,
    (group) => group.category,
    { cascade: true }
  )
  public groups?: Group[]
}
