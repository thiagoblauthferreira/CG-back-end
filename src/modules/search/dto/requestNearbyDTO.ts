import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {  IsNumber, IsString } from 'class-validator';
export class RequestNearbyDTO {
  
  @IsString()
  @ApiProperty({ description: 'Street' })
  street: string;
  @IsString()
  @ApiProperty({ description: 'Number' })
  number: string;

  @IsString()
  @ApiProperty({ description: 'Neighborhood' })
  neighborhood: string;

  @IsString()
  @ApiProperty({ description: 'City' })
  city: string;

  @IsString()
  @ApiProperty({ description: 'State' })
  state: string;

  @IsString()
  @ApiProperty({ description: 'Radius' })
  radius: string;

  }
