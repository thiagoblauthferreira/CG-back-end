import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';

export class SearchDto {
  @IsString()
  @IsOptional()
  readonly neighborhood?: string;

  @IsString()
  @IsOptional()
  readonly street?: string; 

  @IsString()
  @IsOptional()
  readonly city?: string;

  @IsString()
  @IsOptional()
  readonly state?: string; 

  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number;

  @IsInt()
  @Min(1)
  @Max(100) 
  @IsOptional()
  readonly pageSize?: number; 
}
