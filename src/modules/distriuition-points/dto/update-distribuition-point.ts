import { IsOptional, IsString } from 'class-validator';

export class UpdateDistribuitionPoin {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  phone: string;
}
