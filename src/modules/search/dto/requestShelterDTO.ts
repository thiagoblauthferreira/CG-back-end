import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min, Max, IsIn } from 'class-validator';
export class RequestShelterDTO {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'name' })
  readonly name?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Neighborhood' })
  readonly neighborhood?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Street' })
  readonly street?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'City' })
  readonly city?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'State' })
  readonly state?: string;

  }

