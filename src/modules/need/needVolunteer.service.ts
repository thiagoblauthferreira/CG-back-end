import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NeedVolunteers } from "./entities/needVolunteers.entity";
import { User } from "../auth/entities/auth.enity";

@Injectable()
export class NeedVolunteerService {
  constructor(
  @InjectRepository(NeedVolunteers)
  private readonly needVolunteerRepository: Repository<NeedVolunteers>,
  @InjectRepository(User)
  private readonly userRepository: Repository<User>
  )
  {}


  async create (needVolunteers: NeedVolunteers){

    
    return needVolunteers;
  }

}