import { NeedItem } from "src/modules/need/entities/needItems.entity";
import { BadRequestException } from "@nestjs/common";
import { NeedVolunteers } from "src/modules/need/entities/needVolunteers.entity";


  export function validateUpdateDTO(need: Partial<NeedItem> | Partial<NeedVolunteers>): void {

    const now = new Date();
    const limitDate = new Date(need.limitDate)
  
    if (limitDate < now) {
      throw new BadRequestException("A necessidade não pode ser atualizada.");
    }
 
  }

