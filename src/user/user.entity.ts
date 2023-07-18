import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Column,
  Entity, OneToOne
} from "typeorm";
import { Todo } from "../todo/todo.entity";
import { Exclude } from "class-transformer";
import { RoleEnum } from "../shared/types/roles.enum";
import { Cart } from "../cart/cart.entity";
import { Order } from "../orders/order.entity";
import { boolean } from "joi";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 20, unique: true })
  username!: string;

  @Column({ type: "varchar", length: 120, unique: true })
  email!: string;

  @Exclude()
  @Column({ type: "varchar", length: 200 })
  password!: string;

  @Column({type: "varchar", length: 30, default: ""})
  firstname: string;

  @Column({type: "varchar", length: 30, default: ""})
  lastname: string;

  @OneToMany(() => Todo, todo => todo.user)
  todos: Todo[];

  @Column({
    type: "enum",
    enum: RoleEnum,
    array: true,
    default: [RoleEnum.User]
  })
  roles: RoleEnum[];

  @Column({ type: "varchar", length: 200, nullable: true})
  avatar: string;

  @OneToOne(() => Cart, cart => cart.user,{cascade: true})
  cart: Cart;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];

  @Column({ type: 'boolean', default: false })
  isBlocked: boolean

  @CreateDateColumn({ type: "date" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt!: Date;

}
