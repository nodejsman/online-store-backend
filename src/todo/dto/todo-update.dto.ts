import { PartialType } from '@nestjs/mapped-types'
import { CreateTodoDto } from "./todo-create.dto";

export class TodoUpdateDto extends PartialType(CreateTodoDto) {}