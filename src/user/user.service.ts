import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/user-create.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository, UpdateResult } from "typeorm";
import { UserUpdateDto } from "./dto/user-update.dto";
import { FileService } from "../file/file.service";
import { ProfileService } from "../profile/profile.service";
import { ProfileUpdateDto } from "../profile/dto/profile-update.dto";
import { PasswordUpdateDto } from "../profile/dto/password-update.dto";
import { EmailUpdateDto } from "../profile/dto/email-update.dto";


@Injectable()
export class UserService extends ProfileService{

  constructor(fileService: FileService) {
    super(fileService);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true
      }
    });
  }

  findOne(user: User): Promise<User> {
    return this.userRepository.findOne({ where: { id: user.id }});
  }

  getByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  getByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  getUserById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } })
  }

  async createOne(user: CreateUserDto){
    try {
      const newUser = await this.userRepository.save(user);
      return {
        message: 'User created!',
        id: newUser.id,
      }
    } catch (e) {
      throw new BadRequestException(e)
    }
  }

  async updateProfileInfo(userId: number, updateDto: ProfileUpdateDto) {
    return this.updateInfo(await this.getUserById(userId), updateDto)
  }

  async updateProfilePassword(userId: number, updateDto: PasswordUpdateDto) {
    return this.updatePassword(await this.getUserById(userId), updateDto)
  }

  async updateProfileEmail(userId: number, updateDto: EmailUpdateDto) {
    return this.updateEmail(await this.getUserById(userId), updateDto)
  }

  async updateProfileAvatar(userId: number, avatar: Express.Multer.File) {
   
  }
}