import { NeedItem } from "src/modules/need/entities/needItems.entity";
import { INeedValidate } from "./INeedValidator";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { NeedVolunteers } from "src/modules/need/entities/needVolunteers.entity";


@Injectable()
export class VerifyIfDateIsBefore implements INeedValidate<NeedItem | NeedVolunteers>{
  
  validate(need: NeedItem | NeedVolunteers): void {

    if(need.limitDate <= need.created)
      throw new HttpException("The limit date can't be before the need creation.", HttpStatus.BAD_REQUEST);
  }

}