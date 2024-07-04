import {  ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsUUID } from "class-validator";


export class CreateScheduleDTO{

  @ApiProperty()
  @IsUUID(undefined, { message: "O managementId deve ser um UUID válido." })
  @IsNotEmpty({ message: "É obrigatório informar a demanda."})
  managementId: string;

  @ApiProperty()
  @IsNumber({}, { message: "A hora antecedente deve ser um número válido." })
  @IsNotEmpty({ message: "É obrigatório informar a hora antecedente." })
  hoursBefore: number;

}