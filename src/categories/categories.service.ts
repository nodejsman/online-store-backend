import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Category } from "./category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryCreateDto } from "./dto/category-create.dto";
import { CategoryUpdateDto } from "./dto/category-update.dto";

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>
  ) {}

  findAll() {
    return this.categoryRepository.find();
  }

  findByName(name: string) {
    return this.getCategory(name);
  }

  async create(dto: CategoryCreateDto) {
    if (await this.getCategory(dto.name))
      throw new BadRequestException('Category with this name already exists!');

    return this.categoryRepository.save(dto);
  }

  async update(dto: CategoryUpdateDto, id: number) {
    if (await this.getCategory(dto.name))
      throw new BadRequestException('Category with this name already exists!');

    return this.categoryRepository.update({ id }, dto);
  }

  delete(id: number) {
    return this.categoryRepository.delete(id);
  }

  private async getCategory(name) {
    return this.categoryRepository.findOne({where: {name}})
  }
}
