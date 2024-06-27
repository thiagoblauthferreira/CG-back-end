import { BadRequestException } from "@nestjs/common";
import { NeedItem } from "src/modules/need/entities/needItems.entity";
import { NeedVolunteers } from "src/modules/need/entities/needVolunteers.entity";
import { Status } from "src/modules/need/enums/enumsStatus";

export async function needValidator(need: NeedItem | NeedVolunteers){

  if(need && need.status === Status.COMPLETED){
    new BadRequestException("Não é possível adicionar necessidade completa.");
  }

}