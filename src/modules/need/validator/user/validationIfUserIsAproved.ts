import { Status, User } from "src/modules/auth/entities/auth.enity";
import { IUserValidate } from "./IUserValidator";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ValidationIfUserIsApproved implements IUserValidate {
 
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}

  validate(user: User): void {

    if(user.status != Status.APPROVED){
      throw new HttpException("User is not permission to create needs.", HttpStatus.FORBIDDEN);
    }
   
  }
  
}