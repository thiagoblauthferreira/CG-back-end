import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ProducatType } from '../enums/products.enum';

export class CreateProduct {
  @ApiHideProperty()
  @IsEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  type: ProducatType;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  quantity: number;

  @ApiProperty()
  @IsString()
  weight: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  distribuitionPointId: string;
}
