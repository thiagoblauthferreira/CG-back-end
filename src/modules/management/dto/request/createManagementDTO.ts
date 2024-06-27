import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmpty, IsNotEmpty, IsString } from "class-validator";
import { CreateAddressDto } from "src/modules/auth/dto/adress.dto";

export class CreateManagementDTO{

  @ApiHideProperty()
  @IsEmpty()
  id: string;


  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: "É obrigatório informar o coordenador."})
  coordinatorId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: "É obrigatório informar o abrigo."})
  shelterId: string;

  @ApiProperty({ type: String, format: 'date-time', example: '2024-06-17T10:00:00Z' })
  @IsDateString()
  @IsNotEmpty({message: 'É obrigatório informar a data'})
  collectionDate: Date;

 
  @ApiProperty()
  @IsNotEmpty({ message: 'É obrigatório informar o endereço de coleta.'})
  collectPoint: CreateAddressDto;
  
}