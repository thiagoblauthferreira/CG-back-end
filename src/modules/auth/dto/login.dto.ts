import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
<<<<<<< HEAD
import { IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty()
    @IsNotEmpty()// eu alterei pois deu erro no login, estava que o e-mail devia estar vazio
=======
import { IsEmail, IsEmpty, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty()
    @IsEmail()
>>>>>>> 5894575a19bb60d14e0f92fccb3c5c9818ba3454
    email: string;
  
    /**
     * Veja se validar senha forte vai ser 
     * necessário na proxima reunião
     */
    @ApiProperty()
    @IsString()
    password: string;
};