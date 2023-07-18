import { Module } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { ProfileController } from "./profile.controller";
import { UserModule } from "../user/user.module";
import { FileModule } from "../file/file.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/user.entity";


@Module({
  controllers: [ ProfileController ],
  providers: [ ProfileService ],
  imports: [
    FileModule,
    TypeOrmModule.forFeature([User]),
  ]
})
export class ProfileModule {}