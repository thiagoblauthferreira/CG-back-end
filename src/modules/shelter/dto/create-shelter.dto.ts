import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsOptional, IsString } from 'class-validator';
import { CreateAddressDto } from 'src/modules/auth/dto/adress.dto';

export class CreateShelterDto {
  @ApiHideProperty()
  @IsEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ type: () => CreateAddressDto })
  address: CreateAddressDto;

  @ApiHideProperty()
  @IsString()
  creatorId: string;

  @ApiHideProperty()
  @IsEmpty()
  createdAt: Date;

  @ApiHideProperty()
  @IsEmpty()
  updatedAt: Date;

  @ApiHideProperty()
  @IsEmpty()
  deletedAt: Date;
}
