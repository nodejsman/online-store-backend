import {
  CreateDateColumn,
  Entity, JoinColumn, ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Product } from "../product/entities/product.entity";
import { User } from "../user/user.entity";


@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToMany(() => Product, product => product.cart)
  items: Product[];

  @OneToOne(() => User, user => user.cart)
  @JoinColumn()
  user: User;

  @CreateDateColumn({ type: "date" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt!: Date;
}