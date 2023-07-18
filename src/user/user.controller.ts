import {
  Body,
  Controller,
  Delete,
  Get,
  ParseFilePipe,
  Put,
  Query,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserUpdateDto } from "./dto/user-update.dto";
import { User } from "./user.entity";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "../shared/decorators/roles.decorator";
import { RoleEnum } from "../shared/types/roles.enum";
import { FileInterceptor } from "@nestjs/platform-express";
import { CurrentUser } from "../shared/decorators/current-user.decorator";
import { ProfileUpdateDto } from "../profile/dto/profile-update.dto";

@ApiTags('users')
@ApiBearerAuth()
@Roles(RoleEnum.Admin, RoleEnum.SuperAdmin)
@Controller("/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  findMany() {

  }

  @Get()
  findOne(@Query('id') id: number) {
    return this.userService.getUserById(id)
  }

  @Put()
  updateInfo(
    @Query('id') id: number,
    updateDto: ProfileUpdateDto
  ) {
      return this.userService.updateProfileInfo(id, updateDto)
  }

  @UseInterceptors(FileInterceptor('avatar'))
  @Put()
  updateAvatar(
    @Query('id') id: number,
    @UploadedFile(ParseFilePipe) avatar: Express.Multer.File
  ) {

  }

  @Put()
  updatePassword() {

  }

  @Put()
  block(@CurrentUser() user: User) {

  }

  @Delete()
  deleteProfile(@CurrentUser() user: User) {


  }


}