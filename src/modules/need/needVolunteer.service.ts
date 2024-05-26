import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NeedVolunteers } from "./entities/needVolunteers.entity";
import { User } from "../auth/entities/auth.enity";
import { CreateVolunteerDTO } from "./dto/request/createNeedVolunteerDTO";
import NeedVolunteerFactory from "./factory/needVolunteerFactory";

@Injectable()
export class NeedVolunteerService {
  constructor(
  @InjectRepository(NeedVolunteers)
  private readonly needVolunteerRepository: Repository<NeedVolunteers>,
  @InjectRepository(User)
  private readonly userRepository: Repository<User>,
  private readonly needVolunteerFactory: NeedVolunteerFactory
  )
  {}


  async create (createVolunteerDTO: CreateVolunteerDTO){
    const coordinator = await this.userRepository.findOne({

      where: { id: createVolunteerDTO.coordinatorId}
    });

    if(!coordinator ){
      throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
    }
    
    const need  = this.needVolunteerFactory.toNeedVolunteerEntity(coordinator, createVolunteerDTO);

    return await this.needVolunteerRepository.save(need);

  }

  async update (id: string, update: Partial<NeedVolunteers>){
    
    
    const need = await this.find(id);

    if(!need){
      throw new HttpException('Need not found.', HttpStatus.BAD_REQUEST);
    }

    return await this.needVolunteerRepository.save({...need, ...update});

  }

  async find(id: string): Promise<NeedVolunteers>{

   return await this.needVolunteerRepository.findOne({
      where: {id: id},
      relations: ['coordinator']
   })

  }

  async delete(id: string): Promise<boolean> {
   
    const need = await this.find(id);
    if (need){
      await this.needVolunteerRepository.remove(need);
      return true
    }

    return false;

  }

}