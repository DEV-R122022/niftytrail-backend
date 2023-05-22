import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsIn } from "class-validator";
import { IsValidUsername, IsMatched } from "../../__core/decorators";
import { Roles } from "../../__core/enums";
import { httpMessage } from "src/__core/messages";

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsValidUsername()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

    @IsMatched("password", { message: httpMessage["0C001"].message })
    confirmPassword: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsIn(Object.values(Roles))
    role: string;
}