import { Status, User } from "src/modules/auth/entities/auth.enity";
import { ForbiddenException} from "@nestjs/common"; 

export function userValidationsToAccepted(user: User){

  if(user.isCoordinator == true){
    throw new ForbiddenException("Sem autorização parar aceitar necessidades.");
  }

  if(user.status != Status.APPROVED){
    throw new ForbiddenException("Sem autorização parar aceitar necessidades.");
  }
  

}



