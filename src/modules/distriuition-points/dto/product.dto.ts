import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { ProductActionType } from '../enums/distribuition-point.enum';

export class ProductDto {
  @ApiProperty()
  @IsString()
  @IsEnum(ProductActionType)
  action: ProductActionType;

  @ApiProperty()
  @IsString()
  productId: string;
}
