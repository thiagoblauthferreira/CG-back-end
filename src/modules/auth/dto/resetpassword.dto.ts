import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class ResetPasswordDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;
};