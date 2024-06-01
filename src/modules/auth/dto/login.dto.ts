import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsString } from "class-validator";

export class LoginDto {
    @ApiHideProperty()
    @IsEmpty()
    email: string;
  
    @ApiProperty()
    @IsString()
    password: string;
};