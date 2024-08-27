import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, ValidateIf } from 'class-validator';
import { QueryRequest } from 'src/common/dto/query';
import { ProducatType } from '../enums/products.enum';

export class SearchProduct extends QueryRequest {
  @ApiProperty()
  @IsString()
  @IsOptional()
  distribuitionPointId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  search: string;

  @ApiProperty({
    enum: ProducatType,
    enumName: 'ProducatType',
    required: false,
  })
  @ValidateIf((o) => o.type !== '')
  @IsEnum(ProducatType)
  @IsString()
  @IsOptional()
  type: string;
}
