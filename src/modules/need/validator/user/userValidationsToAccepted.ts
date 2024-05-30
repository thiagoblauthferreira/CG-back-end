import { Status, User } from "src/modules/auth/entities/auth.enity";
import { HttpException, HttpStatus } from "@nestjs/common"; 

export function userValidationsToAccepted(user: User){

  if(user.isCoordinator == true){
    throw new HttpException("Coordinator have not permission to accepted needs.", HttpStatus.FORBIDDEN);
  }

  if(user.isDonor != true){
    throw new HttpException("User have not permission to accepted needs.", HttpStatus.FORBIDDEN);
  }

  if(user.status != Status.APPROVED){
    throw new HttpException("User is not permission to create needs.", HttpStatus.FORBIDDEN);
  }

}



