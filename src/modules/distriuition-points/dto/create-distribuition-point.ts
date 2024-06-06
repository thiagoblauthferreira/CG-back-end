import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsOptional, IsString } from 'class-validator';
import { CreateAddressDto } from 'src/modules/auth/dto/adress.dto';

export class CreateDistribuitionPoin {
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

  @ApiHideProperty()
  @IsString()
  @IsOptional()
  creatorId: string;

  @ApiProperty({ type: () => CreateAddressDto })
  address: CreateAddressDto;
}
