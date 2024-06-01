import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty,  IsString, Matches } from "class-validator";
import { CreateAddressDto } from "src/modules/auth/dto/adress.dto";

export class CreatePartnerDTO {
  @ApiHideProperty()
  @IsEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  tradeName: string;

  @ApiProperty()
  @IsString()
  registeredName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, {
    message: 'CNPJ must be in the format XX.XXX.XXX/XXXX-XX',
  })
  cnpj: string;

  @ApiProperty({ type: () => CreateAddressDto })
  address: CreateAddressDto;

}