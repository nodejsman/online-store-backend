import {
  Controller,
  Body, Post,
  Get, Put,
  Delete,
  Param,
  ParseIntPipe, Query
} from "@nestjs/common";
import { CreateTodoDto } from "src/todo/dto/todo-create.dto";
import { TodoService } from "./todo.service";
import { TodoUpdateDto } from "src/todo/dto/todo-update.dto";
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "../shared/decorators/current-user.decorator";
import { User } from "../user/user.entity";
import { Todo } from "./todo.entity";

@ApiTags('todos')
@ApiBearerAuth()
@Controller("/todos")
export class TodoController {
  constructor(
    private readonly todoService: TodoService) {}

  @Post()
  @ApiBody({ type: CreateTodoDto })
  createOne(
    @Body() createTodoDto: CreateTodoDto,
    @CurrentUser() user: User) {
    return this.todoService.createNew(createTodoDto, user);
  }

  @Get('all')
  getAll(@CurrentUser() user: User) {
    return this.todoService.getAll(user);
  }

  @Get('paginate')
  paginate(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('offset', ParseIntPipe) offset: number,
    @CurrentUser() user: User
  ): Promise<Todo[]> {
    return this.todoService.paginate(limit, offset, user);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number})
  getOne(@Param("id", ParseIntPipe) id: number) {
    return this.todoService.getById(+id);
  }


  @Put(":id")
  @ApiParam({ name: 'id', type: Number})
  updateOne(
    @Param("id", ParseIntPipe) id: string,
    @Body() updateTodoDto: TodoUpdateDto,
    @CurrentUser() user: User
  ) {
    return this.todoService.updateById(+id, updateTodoDto, user);
  }

  @Delete(":id")
  @ApiParam({ name: 'id', type: Number})
  deleteOne(
    @Param("id", ParseIntPipe) id: string,
    @CurrentUser() user: User
    ) {
    return this.todoService.deleteById(+id, user);
  }
}
