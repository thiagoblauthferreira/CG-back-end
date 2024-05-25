import { IsString, IsOptional, IsEmpty, IsNumber } from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiHideProperty()
  @IsEmpty()
  id: string;

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