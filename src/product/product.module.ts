import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Category } from "../categories/category.entity";
import { ProductImage } from "./entities/product-image.entity";
import { FileModule } from "../file/file.module";

@Module({
  imports: [
    FileModule,
    TypeOrmModule.forFeature([Product, Category, ProductImage])
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
