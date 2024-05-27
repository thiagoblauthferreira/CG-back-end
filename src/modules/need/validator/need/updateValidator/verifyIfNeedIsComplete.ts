import { NeedItem } from "src/modules/need/entities/needItems.entity";
import { INeedValidate } from "./INeedValidator";
import { NeedVolunteers } from "src/modules/need/entities/needVolunteers.entity";
import { Status } from "src/modules/need/enums/enumsStatus";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";


@Injectable()
export class VerifyIfNeedIsComplete implements INeedValidate<NeedItem | NeedVolunteers>{
  
  validate(need: NeedItem | NeedVolunteers): void {

    if(need.status = Status.COMPLETED)
      throw new HttpException("Invalid characters", HttpStatus.BAD_REQUEST);
  }

}