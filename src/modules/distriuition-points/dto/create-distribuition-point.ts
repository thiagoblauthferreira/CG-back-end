import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsString } from 'class-validator';
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

  @ApiProperty({ type: () => CreateAddressDto })
  address: CreateAddressDto;

  @ApiHideProperty()
  @IsString()
  userId: string;
}
