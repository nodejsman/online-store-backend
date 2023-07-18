import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { OrdersService } from './orders.service';
import { OrderCreateDto } from "./dto/order-create.dto";
import { CurrentUser } from "../shared/decorators/current-user.decorator";
import { User } from "../user/user.entity";

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get()
  async findAll(@CurrentUser() user: User) {
    return this.orderService.find(user);
  }

  @Post()
  async create(
    @Body() dto: OrderCreateDto,
    @CurrentUser() user: User
  ) {
    return this.orderService.create(dto,  user)
  }

  @Delete(':id')
  async delete(
    @Param('id') id: number,
    @CurrentUser() user: User
    ) {
    return this.orderService.remove(id, user)
  }

}
