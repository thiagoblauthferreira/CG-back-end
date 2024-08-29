import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateAddressDto } from "src/modules/auth/dto/adress.dto";
import { UpdateAddressDto } from "./UpdateAddresDto";

export class UpdateManagementDTO{


  @ApiProperty({ type: String, format: 'date-time', example: '2024-06-17T10:00:00Z' })
  @IsDateString()
  @IsOptional()
  collectionDate: Date;

 
  @ApiProperty()
  @IsOptional()
  collectPoint: UpdateAddressDto;
  
}