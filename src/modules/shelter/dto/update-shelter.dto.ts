import { IsOptional, IsString } from 'class-validator';

export class UpdateShelterDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  phone: string;
}
