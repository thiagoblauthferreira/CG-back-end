import {  ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
export class AcceptedNeedDTO {
  
  @ApiProperty()
  @IsString()
  userId: string;

 
}