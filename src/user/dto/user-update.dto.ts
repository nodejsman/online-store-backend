import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./user-create.dto"
import { ApiExtraModels } from "@nestjs/swagger";
@ApiExtraModels()
export class UserUpdateDto extends PartialType(CreateUserDto) {}