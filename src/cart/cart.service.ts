import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cart } from "./cart.entity";
import { Repository } from "typeorm";
import { User } from "../user/user.entity";
import { Product } from "../product/entities/product.entity";

@Injectable()
export class CartService {

  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>
  ) {}
  async find(user: User): Promise<Cart | string> {
    return await this.getUserCart(user) || "Cart is empty"
  }

  async addItem(productId: number, user: User): Promise<Cart> {
    let userCart: Cart = await this.getUserCart(user);
    if (!userCart) {
      const newCart = new Cart()
      newCart.user = user;
      await this.cartRepository.save(newCart)
      userCart = await this.getUserCart(user);
    }
    const product = await this.productRepository.findOne({where: {id: productId}});
    if (!product) {
      throw new BadRequestException("Product id not found")
    }
    userCart.items.push(product)
    return this.cartRepository.save(userCart)
  }

  async removeOne(itemId: number, user: User): Promise<Cart> {
    const userCart = await this.getUserCart(user);

    let index = userCart.items.findIndex(item => item.id === itemId )
    if (index < 0) {
      throw new BadRequestException("Id not found")
    }
    userCart.items.splice(index, 1);
    return this.cartRepository.save(userCart)

  }

  private async getUserCart(user: User): Promise<Cart> {
    return await this.cartRepository
      .findOne({where: {user: {id: user.id}}, relations: ["items"]});
  }

}
