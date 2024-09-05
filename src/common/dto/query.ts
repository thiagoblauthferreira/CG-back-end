import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class QueryRequest {
  @ApiProperty()
  @IsOptional()
  limit: number | string = 10;

  @ApiProperty()
  @IsOptional()
  offset: number | string = 0;

  @ApiProperty()
  @IsOptional()
  @IsString()
  sortBy: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  sort: string;
}
