import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { QueryRequest } from 'src/common/dto/query';

export class SearchDistribuitionPoin extends QueryRequest {
  @ApiProperty()
  @IsOptional()
  @IsString()
  proximity: string;
}
