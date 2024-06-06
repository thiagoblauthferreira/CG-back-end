import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty()
    @IsNotEmpty()// eu alterei pois deu erro no login, estava que o e-mail devia estar vazio
    email: string;
  
    @ApiProperty()
    @IsString()
    password: string;
};