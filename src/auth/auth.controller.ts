import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dto/user-create.dto";
import { Public } from "../shared/decorators/public.decorator";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { CurrentUser } from "../shared/decorators/current-user.decorator";
import { User } from "../user/user.entity";



@ApiTags('auth')
@ApiBearerAuth()
@Controller("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("/signup")
  @ApiBody({ type: CreateUserDto })
  signUp(@Body() dto: CreateUserDto) {
    return this.authService.signUp(dto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("/login")
  @ApiBody({ type: LoginDto })
  login(@CurrentUser() user: User) {
    return this.authService.login(user);
  }

  @Post("/logout")
  logOut() {
    return 'logout';
  }

}