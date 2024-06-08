import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Priority } from "../../enums/enumPriority";
import { Status } from "../../enums/enumsStatus";
import { ArrayMinSize, IsDate, IsEmpty, IsInt, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { Type } from "class-transformer";


export class CreateVolunteerDTO {
  
  @ApiHideProperty()
  @IsEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({message: 'É obrigatório informar o coordenador'})
  coordinatorId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({message: 'É obrigatório informar o título da necessidade'})
  title: string;

  @ApiProperty()
  @IsString()
  @MinLength(50, { message: 'A descrição deve ter no mínimo 50 caracteres.' })
  @MaxLength(250, { message: 'A descrição não pode ultrapassar 250 caracteres.'})
  description: string;

  @ApiProperty()
  @IsString({ each: true})
  @ArrayMinSize(1, { message: 'É obrigatório informar ao menos uma habilidade necessária.' })
  specificSkills: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: "É obrigatório informa informa o id do abrigo."})
  shelterId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: "É obrigatório informar o status inicial da necessidade."})
  status: Status;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: "É obrigatório informar o a prioridade."})
  priority: Priority;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty({ message: "É obrigatório informa a quantidade de horas trabalhadas."})
  workHours: number;

  //YYYY-MM-DD
  @ApiProperty()
  @IsDate()
  @IsNotEmpty({ message: "É obrigatório informa a data limite."})
  @Type(() => Date)
  limitDate: Date;
  
}