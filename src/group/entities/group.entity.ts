import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  public id: number
  
  @Column('varchar', {
    unique: true
  })
  public title: string
}
