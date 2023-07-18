import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { OrderCreateDto } from "./dto/order-create.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./order.entity";
import { In, Repository } from "typeorm";
import { User } from "../user/user.entity";
import { Product } from "../product/entities/product.entity";

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Product) private productRepository: Repository<Product>
  ) {}

  async find(user: User): Promise<Order[]> {
    return this.orderRepository.find({ where: { user: { id: user.id } } });
  }

  async create(orderCreateDto: OrderCreateDto, user: User): Promise<string> {
    const products: Product[] = await this.productRepository.findBy({ id: In([...orderCreateDto.items]) });
    if (products.length !== orderCreateDto.items.length) {
      throw new UnprocessableEntityException("Item not found")
    }
    const newOrder: Order = new Order();
    newOrder.items = products;
    newOrder.user = user;

    await this.orderRepository.save(newOrder)
    return 'Success!'
  }

  remove(id: number, user: User) {
    return this.orderRepository.delete({ id, user: {id: user.id} });
  }
}
