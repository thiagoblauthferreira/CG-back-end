import { IsString, IsOptional, IsEmpty, IsNumber } from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class UpdateAddressDto {

  @ApiProperty()
  @IsString()
  @IsOptional()
  cep: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  estado: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  pais: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  municipio: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  bairro: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  logradouro: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
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