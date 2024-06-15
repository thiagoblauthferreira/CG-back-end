import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty()
    @IsEmail()
    email: string;
  
    /**
     * Veja se validar senha forte vai ser 
     * necessário na proxima reunião
     */
    @ApiProperty()
    @IsString()
    password: string;
};