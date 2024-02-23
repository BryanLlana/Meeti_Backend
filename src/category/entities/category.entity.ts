import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
  @PrimaryGeneratedColumn('increment')
  public id: number

  @Column('varchar', {
    unique: true
  })
  public name: string
}
