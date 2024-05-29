import { NeedItem } from "src/modules/need/entities/needItems.entity";
import { HttpException, HttpStatus } from "@nestjs/common";
import { NeedVolunteers } from "src/modules/need/entities/needVolunteers.entity";
import { Status } from "src/modules/need/enums/enumsStatus";


  export function validateUpdate(need: NeedItem | NeedVolunteers | Partial<NeedItem> | Partial<NeedVolunteers>): void {

    const now = new Date();
    const limitDate = new Date(need.limitDate)
  
    if (limitDate < now) {
     throw new HttpException("The limit date can't be before the need creation.", HttpStatus.BAD_REQUEST);
    }
    
    if(need.id !== null && need.status === Status.COMPLETED){
     throw new HttpException("The need can't be update.", HttpStatus.BAD_REQUEST);
    }
  }

