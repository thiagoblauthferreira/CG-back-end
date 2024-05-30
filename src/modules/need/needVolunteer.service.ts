import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NeedVolunteers } from "./entities/needVolunteers.entity";
import { CreateVolunteerDTO } from "./dto/request/createNeedVolunteerDTO";
import { VerifyIfUserExits } from "./validator/user/verifyIfUserExits";
import { toNeedVolunteerEntity } from "./factory/needVolunteerFactory";
import { userValidations } from "./validator/user/userValidations";
import { validateCreate } from "./validator/need/createValidator/createVerifications";
import { validateUpdate } from "./validator/need/updateValidator/updateValidations";
import { validateUpdateDTO } from "./validator/need/updateValidator/updateValidationsDTO";
import { userValidationsToAccepted } from "./validator/user/userValidationsToAccepted";
import { acceptedValidate } from "./validator/need/accepted/acceptedValidations";


@Injectable()
export class NeedVolunteerService {
  constructor(
  @InjectRepository(NeedVolunteers)
  private needVolunteerRepository: Repository<NeedVolunteers>,
  private verifyIfUserExits: VerifyIfUserExits,
  )
  {}


  async create (createVolunteerDTO: CreateVolunteerDTO){
    

    validateCreate(createVolunteerDTO)

    const coordinator = await this.verifyIfUserExits.verifyIfUserExits(createVolunteerDTO.coordinatorId);
    
    userValidations(coordinator);

    const need  = toNeedVolunteerEntity(coordinator, createVolunteerDTO);

    return await this.needVolunteerRepository.save(need);

  }

  async update(id: string, update: Partial<NeedVolunteers>){


    //ficaram dois código, um para verificar o update e outro para verificar a própria need
    validateUpdateDTO(update)
    
    const need = await this.find(id);

    userValidations(need.coordinator);
    //verificação da need
    validateUpdate(need)
    const updateNeed = Object.assign(need, update)
  
    return await this.needVolunteerRepository.save(updateNeed);

  }

  async find(id: string): Promise<NeedVolunteers>{

    const need =  await this.needVolunteerRepository.findOne({
      where: {id: id},
      relations: ['coordinator']
   })
    if(!need){
      throw new HttpException('Need not found.', HttpStatus.BAD_REQUEST);
    }
    return need;
  }

  async delete(id: string): Promise<boolean> {
   
   const need = await this.find(id);
   userValidations(need.coordinator);
   await this.needVolunteerRepository.remove(need);
   return true
  
  }

  async findAll(): Promise<NeedVolunteers[]>{
    return await this.needVolunteerRepository.find({
     relations: ['coordinator']
     })
   }

    async accepted(id: string, userId: string): Promise<NeedVolunteers> {
      const volunteer = await this.verifyIfUserExits.verifyIfUserExits(userId)
      userValidationsToAccepted(volunteer);
      const need = await this.find(id);
      acceptedValidate(need);
      need.volunteers.push(volunteer.id);
      await this.needVolunteerRepository.save(need)
      return need
          
     }

}