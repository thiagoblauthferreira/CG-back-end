import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { QueryRequest } from 'src/common/dto/query';

export class SearchShelter extends QueryRequest {
  @ApiProperty()
  @IsOptional()
  @IsString()
  proximity: string;
}
