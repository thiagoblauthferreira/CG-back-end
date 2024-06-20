import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty()
    @IsNotEmpty()
    email: string;
  
    @ApiProperty()
    @IsString()
    password: string;
};