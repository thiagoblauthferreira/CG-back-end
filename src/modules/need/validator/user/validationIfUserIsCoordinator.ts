import { User } from "src/modules/auth/entities/auth.enity";
import { IUserValidate } from "./IUserValidator";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ValidationIfUserIsCoordinator implements IUserValidate {
 
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}

   validate(user: User) {

     
    if(user.isCoordinator == false){
      throw new HttpException("User is not permission to create needs.", HttpStatus.FORBIDDEN);
    }
   
  }
  
}