import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { CreateUserDto } from "../user/dto/user-create.dto";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { User } from "../user/user.entity";
import { IJwtPayload } from "../shared/types/jwt-payload.interface";



@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async signUp(dto: CreateUserDto): Promise<Partial<User>> {
    if (await this.userService.getByUsername(dto.username))
      throw new BadRequestException('Username already exists');

    if (await this.userService.getByEmail(dto.email))
      throw new BadRequestException('Email already exists');

    const hashPassword: string = await this.hashData(dto.password);
    return await this.userService.createOne({...dto, password: hashPassword});
  }

  async login(user: User): Promise<any> {
    const payload: IJwtPayload = { sub: user.id, email: user.email};
    return {
      access_token: this.jwtService.sign(payload),
    }
  }


  async validateUser(email: string, password: string): Promise<any> {
    const user: User = await this.userService.getByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  private async hashData(data): Promise<string> {
    return await bcrypt.hash(data, 10);
  }

}