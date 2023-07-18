import {
  Column,
  CreateDateColumn,
  Entity, JoinTable,
  ManyToMany, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Cart } from "../../cart/cart.entity";
import { Order } from "../../orders/order.entity";
import { Category } from "../../categories/category.entity";
import { ProductImage } from "./product-image.entity";


@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 30})
  name: string;

  @Column({ type: "varchar", length: 100 })
  description: string;

  @Column({type: "varchar", default: ''})
  previewImage: string;

  @Column({ type: "int" })
  price: number;


  @ManyToMany(() => Cart, cart => cart.items, { cascade: true })
  @JoinTable({name: "product_cart"})
  cart: Cart;

  @ManyToMany(() => Order, order => order.items, { cascade: true })
  @JoinTable({name: "product_order"})
  orders: Order[];

  @ManyToMany(() => Category, category => category.products, {cascade: true})
  @JoinTable({ name: "product_category"})
  categories: Category[];

  @OneToMany(() => ProductImage, productImage => productImage.product, { cascade: true })
  images: ProductImage[];

  @CreateDateColumn({ type: "date" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt!: Date;

  constructor(data?: Partial<Product>) {
    Object.assign(this, data);
  }
}