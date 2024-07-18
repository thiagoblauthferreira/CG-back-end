import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty,  IsNotEmpty,  IsNumber,  IsOptional,  IsString, Matches, MinLength } from "class-validator";



export class CreateCompanyDTO {
  @ApiHideProperty()
  @IsEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @MinLength(2, { message: 'O nome do parceiro deve ter pelo menos 2 caracteres' })
  tradeName: string;

  @ApiProperty()
  @IsString()
  @MinLength(2, { message: 'O nome registrado deve ter pelo menos 2 caracteres' })
  registeredName: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty({ message: "É obrigatório informar o e-mail"})
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: "É obrigatório informar o número de contato"})
  contact: string;

  @ApiProperty()
  @IsString({ each: true })
  @IsOptional({ each: true })
  partner: string[];

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
  state: string;

  @ApiProperty()
  @IsString()
  @MinLength(2, { message: 'O país deve ter pelo menos 2 caracteres' })
  country: string;

  @ApiProperty()
  @IsString()
  @MinLength(2, { message: 'O município deve ter pelo menos 2 caracteres' })
  county: string;

  @ApiProperty()
  @IsString()
  @MinLength(2, { message: 'O bairro deve ter pelo menos 2 caracteres' })
  neighborhood: string;

  @ApiProperty()
  @IsString()
  @MinLength(2, { message: 'O logradouro deve ter pelo menos 2 caracteres' })
  street: string;

  @ApiProperty()
  @IsString()
  number: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  complement: string;

  
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  latitude: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  longitude: number;

}