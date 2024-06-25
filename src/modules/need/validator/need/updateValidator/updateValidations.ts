import { NeedItem } from "src/modules/need/entities/needItems.entity";
import { BadRequestException } from "@nestjs/common";
import { NeedVolunteers } from "src/modules/need/entities/needVolunteers.entity";
import { Status } from "src/modules/need/enums/enumsStatus";


  export function validateUpdate(need: NeedItem | NeedVolunteers): void {

    const now = new Date();
    const limitDate = new Date(need.limitDate)
  
    if (limitDate < now) {
      throw new BadRequestException("A data limite não pode ser anterior a data de criação");
    }
    
    if(need.status === Status.COMPLETED){
     throw new BadRequestException("A necessidade não pode ser atualizada.");
    }
  }

