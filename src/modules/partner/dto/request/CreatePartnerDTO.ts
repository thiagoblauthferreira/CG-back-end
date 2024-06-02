import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty,  IsNumber,  IsOptional,  IsString, Matches, MinLength } from "class-validator";


export class CreatePartnerDTO {
  @ApiHideProperty()
  @IsEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  tradeName: string;

  @ApiProperty()
  @IsString()
  registeredName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, {
    message: 'CNPJ must be in the format XX.XXX.XXX/XXXX-XX',
  })
  cnpj: string;

  @ApiProperty()
  @IsString()
  cep: string;

  @ApiProperty()
  @IsString()
  estado: string;

  @ApiProperty()
  @IsString()
  pais: string;

  @ApiProperty()
  @IsString()
  municipio: string;

  @ApiProperty()
  @IsString()
  bairro: string;

  @ApiProperty()
  @IsString()
  logradouro: string;

  @ApiProperty()
  @IsString()
  numero: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  complemento: string;

  
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  latitude: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  longitude: number;

}