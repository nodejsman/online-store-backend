import {  Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CartService } from './cart.service';
import { CurrentUser } from "../shared/decorators/current-user.decorator";
import { User } from "../user/user.entity";

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async findAllItems(@CurrentUser() user: User) {
    return this.cartService.find(user);
  }

  @Post('add_item/:id')
  async addItem(
    @Param('id') productId: number,
    @CurrentUser() user: User
  ) {
    return this.cartService.addItem(productId, user);
  }

  @Delete('remove-item/:id')
  async removeItem(
    @Param('id') itemId: number,
    @CurrentUser() user: User
  ) {
    return this.cartService.removeOne(+itemId, user);
  }
}
