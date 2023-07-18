import { IsString, IsBoolean, IsNotEmpty} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateTodoDto {

    @ApiProperty({ example: 'This is a title'})
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'false'})
    @IsBoolean()
    @IsNotEmpty()
    completed: boolean;
}