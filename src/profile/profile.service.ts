import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from "../user/user.entity";
import { UserUpdateDto } from "../user/dto/user-update.dto";
import { UserService } from "../user/user.service";
import { ProfileUpdateDto } from "./dto/profile-update.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FileService } from "../file/file.service";
import { PasswordUpdateDto } from "./dto/password-update.dto";
import * as bcrypt from "bcrypt";
import { EmailUpdateDto } from "./dto/email-update.dto";


@Injectable()
export class ProfileService {

  @InjectRepository(User)
  readonly userRepository: Repository<User>;
  constructor(private fileService: FileService) {}

  find(user: User) {
    return this.userRepository.findOne({where: { id: user.id }})
  }

  updateInfo(user: User, updateDto: ProfileUpdateDto) {
    return this.userRepository.update(user.id, {...updateDto})
  }

  async updatePassword(user: User, updateDto: PasswordUpdateDto) {
    if (!await bcrypt.compare(updateDto.oldPassword, user.password))
      throw new BadRequestException("Passwords do not match!");

    return this.userRepository.update(user.id, {password: updateDto.newPassword})
  }

  async updateEmail(user: User, updateDto: EmailUpdateDto) {
    if (!await bcrypt.compare(updateDto.currentPassword, user.password))
      throw new BadRequestException('Passwords do not match!');

    return ''
  }

  async setAvatar(user: User, avatar: Express.Multer.File) {

    if (user.avatar)
      await this.fileService.removeImages([user.avatar])

    const [ newAvatarUrl ]: string[] = await this.fileService.saveImages([avatar], 'user_avatars');
    user.avatar = newAvatarUrl;

    return this.userRepository.update(user.id, user)
  }

  delete(user: User) {
    return this.userRepository.delete(user.id)
  }


}