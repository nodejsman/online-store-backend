import { CategoryCreateDto } from "./category-create.dto";
import { PartialType } from "@nestjs/mapped-types";


export class CategoryUpdateDto extends PartialType(CategoryCreateDto) {}