import { BadRequestException } from "@nestjs/common";
import { CreateNeedItemDTO } from "src/modules/need/dto/request/createNeedItemDTO";
import { CreateVolunteerDTO } from "src/modules/need/dto/request/createNeedVolunteerDTO";


  export function validateCreate(need: CreateNeedItemDTO | CreateVolunteerDTO): void {
    const now = new Date();
    const limitDate = new Date(need.limitDate)
  
    if (limitDate < now) {
      throw new BadRequestException("A data limite não pode ser anterior a data de criação");
    }
  }

