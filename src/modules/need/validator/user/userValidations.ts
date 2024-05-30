import { Status, User } from "src/modules/auth/entities/auth.enity";
import { HttpException, HttpStatus } from "@nestjs/common"; 

export function userValidations(user: User){

  if(user.isCoordinator === false){
    throw new HttpException("User is not permission to create needs.", HttpStatus.FORBIDDEN);
  }

  if(user.status != Status.APPROVED){
    throw new HttpException("User is not permission to create needs.", HttpStatus.FORBIDDEN);
  }

}



