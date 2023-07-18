import { Body, Controller, Delete, Get, ParseFilePipe, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { CurrentUser } from "../shared/decorators/current-user.decorator";
import { User } from "../user/user.entity";
import { UserUpdateDto } from "../user/dto/user-update.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ProfileUpdateDto } from "./dto/profile-update.dto";
import { PasswordUpdateDto } from "./dto/password-update.dto";
import { EmailUpdateDto } from "./dto/email-update.dto";


@Controller('profile')
export class ProfileController {

  constructor(private profileService: ProfileService) {}

  @Get()
  find(@CurrentUser() user: User) {
    return this.profileService.find(user)
  }


  @Put('update-info')
  updateInfo(
    @CurrentUser() user: User,
    @Body() updateDto: ProfileUpdateDto
  ) {
    return this.profileService.updateInfo(user, updateDto)
  }

  @Put()
  updatePassword(
    @CurrentUser() user: User,
    @Body() updateDto: PasswordUpdateDto
  ) {
    return this.profileService.updatePassword(user, updateDto)
  }

  @Put()
  updateEmail(
    @CurrentUser() user: User,
    @Body() updateDto: EmailUpdateDto
  ) {
    return this.profileService.updateEmail(user, updateDto)
  }

  @UseInterceptors(FileInterceptor('avatar'))
  @Put('update-avatar')
  setAvatar(
    @CurrentUser() user: User,
    @UploadedFile(ParseFilePipe) avatar: Express.Multer.File
  ){
    return this.profileService.setAvatar(user, avatar)
  }


  @Delete('delete')
  delete(@CurrentUser() user: User) {
    return this.profileService.delete(user)
  }



}