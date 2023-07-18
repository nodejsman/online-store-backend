import { IsNotEmpty, IsNumber } from "class-validator";


export class AddItemDto {
  @IsNumber()
  @IsNotEmpty()
  product_id: number;
}