import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Priority } from "../../enums/enumPriority";
import { Status } from "../../enums/enumsStatus";
import { IsDateString, IsEmpty, IsEnum, IsISO8601, IsNotEmpty, IsObject, IsString, MaxLength, MinLength, Validate } from "class-validator";
import { Type } from "class-transformer";
export class CreateNeedItemDTO {
  
  @ApiHideProperty()
  @IsEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({message: 'É obrigatório informar o coordenador'})
  coordinatorId: string;

  @ApiProperty()
  @IsObject()
  item: { [key: string]: number};

  @ApiProperty()
  @IsString()
  @IsNotEmpty({message: 'É obrigatório informar o título da necessidade'})
  title: string;

  @ApiProperty()
  @IsString()
  @MinLength(20, { message: 'A descrição deve ter no mínimo 50 caracteres.' })
  @MaxLength(250, { message: 'A descrição não pode ultrapassar 250 caracteres.'})
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: "É obrigatório informa informa o id do abrigo."})
  shelterId: string;

  @ApiProperty({ enum: Status, default: Status.CREATED })
  @IsEnum(Status)
  @IsNotEmpty({ message: "É obrigatório informar o status inicial da necessidade."})
  status: Status;

  @ApiProperty({ enum: Priority, default: Priority.LOW })
  @IsNotEmpty({ message: "É obrigatório informar o a prioridade."})
  @IsEnum(Priority)
  priority: Priority;

  //YYYY-MM-DD
  @ApiProperty()
  @Validate(IsISO8601)
  @IsDateString()
  @IsNotEmpty({ message: "É obrigatório informar a data limite."})
  limitDate: Date;
  
}