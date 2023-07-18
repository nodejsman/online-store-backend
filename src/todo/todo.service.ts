import { Injectable } from "@nestjs/common";
import { CreateTodoDto } from "src/todo/dto/todo-create.dto";
import { TodoUpdateDto } from "src/todo/dto/todo-update.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Todo } from "./todo.entity";
import { User } from "../user/user.entity";

@Injectable()
export class TodoService {

  @InjectRepository(Todo)
  private readonly todoRepository: Repository<Todo>;

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;


  async createNew(todo: CreateTodoDto, user: User) {
    const newTodo = {...todo, user}
    return {...await this.todoRepository.save(newTodo), user: user.id}
  }

  async getAll(user: User): Promise<Todo[]> {
    return this.todoRepository.find({where: {user: {id: user.id}}, loadRelationIds: true});
  }

  async getById(id: number): Promise<Todo> {
    return this.todoRepository.findOne({where: {id}, loadRelationIds: true})
  };

  paginate(limit: number, offset: number, user: User) {
    return this.todoRepository.find({
      where: {user: {id: user.id}},
      skip: offset,
      take: limit,
    });
  }

  async updateById(id: number, todo: TodoUpdateDto, user: User): Promise<any> {
    return this.todoRepository.update({id, user: {id: user.id}}, todo);
  }

  deleteById(id: number, user: User): Promise<any> {
    return this.todoRepository.delete({ id, user: {id: user.id} });
  }
}
