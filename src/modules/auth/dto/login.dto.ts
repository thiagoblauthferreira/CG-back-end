import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty()
    @IsEmpty()
    email: string;
  
    @ApiProperty()
    @IsString()
    password: string;
};