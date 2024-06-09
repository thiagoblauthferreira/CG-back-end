import {  ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
export class CancelNeedDTO {
  
  @ApiProperty()
  @IsString()
  userId: string;
  
}