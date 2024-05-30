import { NeedItem } from "src/modules/need/entities/needItems.entity";
import { HttpException, HttpStatus } from "@nestjs/common";
import { NeedVolunteers } from "src/modules/need/entities/needVolunteers.entity";


  export function validateUpdateDTO(need: Partial<NeedItem> | Partial<NeedVolunteers>): void {

    const now = new Date();
    const limitDate = new Date(need.limitDate)
  
    if (limitDate < now) {
     throw new HttpException("The limit date can't be before the need creation.", HttpStatus.BAD_REQUEST);
    }
 
  }
