import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { QueryRequest } from 'src/common/dto/query';

export class SearchProduct extends QueryRequest {
  @ApiProperty()
  @IsString()
  @IsOptional()
  distribuitionPointId: string;
}
