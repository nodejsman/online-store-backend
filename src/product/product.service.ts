import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { DeleteResult, In, Repository } from "typeorm";
import { ProductCreateDto } from "./dto/product-create.dto";
import { Category } from "../categories/category.entity";
import { ProductUpdateDto } from "./dto/product-update.dto";
import { FileService } from "../file/file.service";
import { ProductImage } from "./entities/product-image.entity";
import { IProductMedia } from "./product-images.interface";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    @InjectRepository(ProductImage) private readonly productImageRepository: Repository<ProductImage>,
    private fileService: FileService
  ) {
  }


  findAll(): Promise<Product[]> {
    return this.productRepository
      .createQueryBuilder("product")
      .select('product.id', 'id')
      .addSelect('product.name', 'name')
      .addSelect('product.description', 'description')
      .addSelect('product.price', 'price')
      .addSelect('product.previewImage', 'img')
      .getRawMany();
  }

  async findOne(id: number){
    const product: Product = await this.productRepository
      .findOne({
        where: {id},
        relations: ['categories', 'images']
      })
    return {
      ...product,
      images: product.images.map(item => item.url),
      categories: product.categories.map(item => ({
        id: item.id,
        url: item.name
      }))
    }
  }

  async createOne(productMedia: IProductMedia, productCreateDto: ProductCreateDto): Promise<{}> {

    const categories: Category[] = await this.getCategories(productCreateDto.categoryIDs);

    const mainImageLinks: string[] = await this.fileService.saveImages(productMedia.images, 'product_images');
    const [ previewImageLink ]: string[] = await this.fileService.saveImages(productMedia.previewImage, 'product_images');


    const newImages: ProductImage[] = mainImageLinks.map((imageUrl) => {
      const image: ProductImage = new ProductImage();
      image.url = imageUrl;
      return image;
    });

    const newProduct: Product = new Product({
      ...productCreateDto,
      previewImage: previewImageLink,
      categories: [...categories],
      images: newImages
    });

    const savedProduct: Product = await this.productRepository.save(newProduct)

    const {id, name} = savedProduct;
    return { message: "New Product added", product: {id, name} };
  }

  async updateOne(
    productUpdateDto: ProductUpdateDto,
    { images, previewImage }: IProductMedia,
    id: number
  ) {

    const existProduct: Product = await this.productRepository.findOne({ where: { id }, relations: ['images'] });
    if (!existProduct)
      throw new UnprocessableEntityException('Product not exists')

    if (images) {

      // Delete old images
      const existingImagesLinks: string[] = existProduct.images.map(el => el.url)
      await this.fileService.removeImages(existingImagesLinks);

      // Save new images to disk
      const newImageUrls: string[] = await this.fileService.saveImages(images, 'product_images');

      const newImages: ProductImage[] = newImageUrls.map((url) => {
        const newProductImage: ProductImage = new ProductImage();
        newProductImage.url = url;
        return newProductImage;
      })
      await this.productImageRepository.remove(existProduct.images)
      existProduct.images = newImages;
    }

    if (previewImage) {
      // Delete old preview image
      await this.fileService.removeImages([existProduct.previewImage]);

      // Save new preview image
      const [ newPreviewImageLink ] = await this.fileService.saveImages(previewImage, 'product_images');

      existProduct.previewImage = newPreviewImageLink
    }

    // Copy new values to existing product
    Object.assign(existProduct, productUpdateDto)

    return this.productRepository.save(existProduct)

  }

  async deleteOne(id: number): Promise<DeleteResult | string> {
    const productToDelete: Product = await this.productRepository
      .findOne({ where: { id } , relations: ['images']});

    if (!productToDelete) return 'Product not exists!';

    const deleteResult = await this.productRepository.delete(id);

    const imageUrls: string[] = productToDelete.images.map(image => image.url)
    await this.fileService.removeImages([...imageUrls, productToDelete.previewImage])

    return deleteResult;
  }

  private async getCategories(categoryIdArray: number[]): Promise<Category[]> {
    const categories = await this.categoryRepository.findBy({ id: In([...categoryIdArray]) });
    if (!categories || categories.length < categoryIdArray.length) {
      throw new UnprocessableEntityException("One or several categories was not founded!");
    }
    return categories;
  }

}
