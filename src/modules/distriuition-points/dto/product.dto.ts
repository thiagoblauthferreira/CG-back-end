import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ProductActionType } from '../enums/distribuition-point.enum';

export class ProductDto {
  @ApiProperty()
  @IsString()
  action: ProductActionType;

  @ApiProperty()
  @IsString()
  productId: string;
}
