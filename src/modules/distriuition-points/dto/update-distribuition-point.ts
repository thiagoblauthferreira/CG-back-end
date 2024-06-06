import { ApiHideProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateDistribuitionPoin {
  @ApiHideProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiHideProperty()
  @IsString()
  @IsOptional()
  phone: string;

  @ApiHideProperty()
  @IsString()
  @IsOptional()
  creatorId: string;
}
