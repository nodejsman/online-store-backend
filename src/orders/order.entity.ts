import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn, ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { OrderStatusEnum } from "./order-status.enum";
import { Product } from "../product/entities/product.entity";
import { User } from "../user/user.entity";


@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "enum", enum: OrderStatusEnum, default: OrderStatusEnum.PENDING})
  status: OrderStatusEnum;

  @ManyToMany(() => Product, product => product.orders)
  items: Product[];

  @ManyToOne(() => User, user => user.orders)
  @JoinColumn()
  user: User;

  @CreateDateColumn({ type: "date" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt!: Date;
}