import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Priority } from "../../enums/enumPriority";
import { Status } from "../../enums/enumsStatus";
import { IsDateString, IsEmpty, IsISO8601, IsObject, IsString, Validate } from "class-validator";
export class CreateNeedItemDTO {
  
  @ApiHideProperty()
  @IsEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  coordinatorId: string;

  @ApiProperty()
  @IsObject()
  item: { [key: string]: number};

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  shelterId: string;

  @ApiProperty()
  @IsString()
  status: Status;

  @ApiProperty()
  @IsString()
  priority: Priority;

  //YYYY-MM-DD
  @ApiProperty()
  @Validate(IsISO8601)
  @IsDateString()
  limitDate: Date;
  
}