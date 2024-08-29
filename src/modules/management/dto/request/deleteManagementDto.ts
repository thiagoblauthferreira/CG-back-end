import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class DeleteManagementDto {
  @ApiProperty()
  @IsString()
  userId: string;
}