import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./order.entity";
import { Product } from "../product/entities/product.entity";
import { User } from "../user/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, User, Product])
  ],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
