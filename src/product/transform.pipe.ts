import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from "@nestjs/common";
import { ProductCreateDto } from "./dto/product-create.dto";


@Injectable()
export class TransformToNumberArrayPipe implements PipeTransform {
  transform(value: ProductCreateDto, metadata: ArgumentMetadata): ProductCreateDto | any {
    return {
      ...value,
      categoryIDs: value.categoryIDs.map(item => {
        if (Number(item)) return Number(item);
        else throw new BadRequestException("Each category id should be number string or number!");
      })
    };
  }
}