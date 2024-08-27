import { ForbiddenException } from "@nestjs/common";
import { Status, User } from "src/modules/auth/entities/auth.enity";

export function createValidator(coordinator: User){

  if(!coordinator.isCoordinator){
   
    throw new ForbiddenException('Usuário sem permissão para realizar agendamento.')
  }
  if(coordinator.status != Status.APPROVED ){
  
    throw new ForbiddenException('Usuário sem permissão para realizar agendamento.')
  }

}
