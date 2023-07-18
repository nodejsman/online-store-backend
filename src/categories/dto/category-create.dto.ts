import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CategoryCreateDto {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;

}