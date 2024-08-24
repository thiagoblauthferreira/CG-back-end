import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class RestoresDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: "É obrigatório informar o admin."})
  id: string;
}