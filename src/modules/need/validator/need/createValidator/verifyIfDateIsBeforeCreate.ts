import { INeedValidate } from "./INeedValidatorCreate";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateNeedItemDTO } from "src/modules/need/dto/request/createNeedItemDTO";
import { CreateVolunteerDTO } from "src/modules/need/dto/request/createNeedVolunteerDTO";


@Injectable()
export class VerifyIfDateIsBeforeCreate implements INeedValidate<CreateNeedItemDTO | CreateVolunteerDTO> {
  
  validate(need: CreateNeedItemDTO | CreateVolunteerDTO): void {
    const now = new Date();
    const limitDate = new Date(need.limitDate)
  
    if (limitDate < now) {
     throw new HttpException("The limit date can't be before the need creation.", HttpStatus.BAD_REQUEST);
    }
  }

}