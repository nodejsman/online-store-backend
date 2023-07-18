import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: 'admin'})
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'Admin'})
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  firstname: string;

  @ApiProperty({ example: 'User'})
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  lastname: string;

  @ApiProperty({ example: 'admin@gmail.com'})
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'admin'})
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  avatar: string;

  @IsOptional()
  @IsString( {each: true,})
  images: string[];

  @IsOptional()
  @IsString( {each: true})
  videos: string[];
}