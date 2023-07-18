import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Product } from "../product/entities/product.entity";


@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 30, unique: true})
  name: string;

  @Column({ type: "varchar", length: 100, default: "No description" })
  description: string;

  @ManyToMany(() => Product, product => product.categories)
  products: Product[];

  @CreateDateColumn({ type: "date" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt!: Date;
}