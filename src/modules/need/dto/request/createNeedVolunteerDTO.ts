import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Priority } from "../../enums/enumPriority";
import { Status } from "../../enums/enumsStatus";
import { IsDateString, IsEmpty, IsISO8601, IsInt, IsString, Validate } from "class-validator";


export class CreateVolunteerDTO {
  
  @ApiHideProperty()
  @IsEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  coordinatorId: string;

  @ApiProperty()
  @IsString()
  volunteers: string[];

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  specificSkills: string[];

  @ApiProperty()
  @IsString()
  shelterId: string;

  @ApiProperty()
  @IsString()
  status: Status;

  @ApiProperty()
  @IsString()
  priority: Priority;

  @ApiProperty()
  @IsInt()
  workHours: number;

  //YYYY-MM-DD
  @ApiProperty()
  @Validate(IsISO8601)
  @IsDateString()
  limitDate: Date;
  
}