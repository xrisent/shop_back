import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Size {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  size: string;
}
