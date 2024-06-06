import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty,  IsNumber,  IsOptional,  IsString, Matches, MinLength } from "class-validator";


export class CreateCompanyDTO {
  @ApiHideProperty()
  @IsEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @MinLength(3, { message: 'O nome do parceiro deve ter pelo menos 3 caracteres' })
  tradeName: string;

  @ApiProperty()
  @IsString()
  @MinLength(3, { message: 'O nome registrado deve ter pelo menos 3 caracteres' })
  registeredName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
  password: string;

  @ApiProperty()
  @IsString({ message: 'O CNPJ deve estar no formato XX.XXX.XXX/XXXX-XX' })
  @Matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, {
    message: 'CNPJ inválido',
  })
  cnpj: string;

  @ApiProperty()
  @IsString()
  @MinLength(8, { message: 'O CEP deve ter pelo menos 8 caracteres' })
  cep: string;

  @ApiProperty()
  @IsString()
  @MinLength(2, { message: 'O estado deve ter pelo menos 2 caracteres' })
  estado: string;

  @ApiProperty()
  @IsString()
  @MinLength(2, { message: 'O país deve ter pelo menos 2 caracteres' })
  pais: string;

  @ApiProperty()
  @IsString()
  @MinLength(2, { message: 'O município deve ter pelo menos 2 caracteres' })
  municipio: string;

  @ApiProperty()
  @IsString()
  @MinLength(2, { message: 'O bairro deve ter pelo menos 2 caracteres' })
  bairro: string;

  @ApiProperty()
  @IsString()
  @MinLength(2, { message: 'O logradouro deve ter pelo menos 2 caracteres' })
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