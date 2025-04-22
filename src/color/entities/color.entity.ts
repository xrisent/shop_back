import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Color {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  color: string;

  @Column()
  code: string
}