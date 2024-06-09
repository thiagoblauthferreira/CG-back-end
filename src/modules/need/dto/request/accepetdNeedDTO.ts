import {  ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Status } from "../../enums/enumsStatus";
export class AcceptedNeedDTO {
  
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  status: Status;


  
}