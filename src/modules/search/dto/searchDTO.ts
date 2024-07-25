import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min, Max, IsIn } from 'class-validator';
export class SearchDto {
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

  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiPropertyOptional({ description: 'Page', minimum: 1 })
  readonly page?: number;

  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  @ApiPropertyOptional({ description: 'Page size', minimum: 1, maximum: 100 })
  readonly pageSize?: number;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  @ApiPropertyOptional({ description: 'Sort order', enum: ['ASC', 'DESC'] })
  sortOrder?: string;
}

