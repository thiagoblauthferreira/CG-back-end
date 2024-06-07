import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { UpdateAddressDto } from 'src/modules/auth/dto/update-adress.dto';

export class UpdateDistribuitionPoin {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ type: () => UpdateAddressDto })
  @IsOptional()
  address: UpdateAddressDto;
}
