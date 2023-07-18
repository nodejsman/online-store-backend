import {
  Body, Controller, Delete,
  Get, Param, ParseFilePipe,
  Post, Put, UploadedFiles,
  UseInterceptors
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductCreateDto } from "./dto/product-create.dto";
import { ProductUpdateDto } from "./dto/product-update.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { TransformToNumberArrayPipe } from "./transform.pipe";
import { IProductMedia } from "./product-images.interface";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('all')
  async findAll() {
    return this.productService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
    return this.productService.findOne(id);
  }


  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'images' },
    { name: 'previewImage', maxCount: 1 }
  ]))
  async create(
    @UploadedFiles(ParseFilePipe) files: IProductMedia,
    @Body(TransformToNumberArrayPipe) productDto: ProductCreateDto,
  ): Promise<{}> {
    return this.productService.createOne(files, productDto);
  }

  @Put(":id")
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'images' },
    { name: 'previewImage', maxCount: 1 }
  ]))
  async update(
    @UploadedFiles(ParseFilePipe) files: IProductMedia,
    @Body(TransformToNumberArrayPipe) product: ProductUpdateDto,
    @Param("id") id: number
  ) {
    return this.productService.updateOne(product, files, id);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.productService.deleteOne(+id)
  }
}
