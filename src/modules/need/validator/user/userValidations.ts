import { Status, User } from "src/modules/auth/entities/auth.enity";
import { ForbiddenException } from "@nestjs/common"; 

export function userValidations(user: User){

  if(user.isCoordinator === false){
    throw new ForbiddenException("Sem permissão para criar necessidades.");
  }

  if(user.status != Status.APPROVED){
    throw new ForbiddenException("Sem permissão para criar necessidades..");
  }

}



