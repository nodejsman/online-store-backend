import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber } from "class-validator";

export class OrderCreateDto {

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  items: number[];

}