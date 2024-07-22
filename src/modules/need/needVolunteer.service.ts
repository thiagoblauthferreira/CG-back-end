import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
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
import { VerifyIfShelterExits } from "./validator/shelter/verifyIfShelterExits";
import { Status } from "./enums/enumsStatus";


@Injectable()
export class NeedVolunteerService {
  constructor(
  @InjectRepository(NeedVolunteers)
  private needVolunteerRepository: Repository<NeedVolunteers>,
  private verifyIfUserExits: VerifyIfUserExits,
  private verifyIfShelterExists: VerifyIfShelterExits,
  )
  {}


  async create (createVolunteerDTO: CreateVolunteerDTO){
    

    validateCreate(createVolunteerDTO)

    const coordinator = await this.verifyIfUserExits.verifyIfUserExits(createVolunteerDTO.coordinatorId);
    
    userValidations(coordinator);

    const shelter = await this.verifyIfShelterExists.verifyIfShelterExits(createVolunteerDTO.shelterId)

    const need  = toNeedVolunteerEntity(coordinator, shelter, createVolunteerDTO);

    return await this.needVolunteerRepository.save(need);

  }

  async update(id: string, update: Partial<NeedVolunteers>){

    //ficaram dois código, um para verificar o update e outro para verificar a própria need
    validateUpdateDTO(update)
    await this.verifyIfShelterExists.verifyIfShelterExits(update.shelter.id)
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
      relations: ['coordinator', 'shelter', 'volunteers']
   })
    if(!need){
      throw new NotFoundException('Necessidade não encontrada');
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
     relations: ['coordinator', 'shelter']
     })
   }

  async accepted(id: string, userId: string): Promise<NeedVolunteers> {
    const volunteer = await this.verifyIfUserExits.verifyIfUserExits(userId)
    userValidationsToAccepted(volunteer);
    const need = await this.find(id);
    acceptedValidate(need);
    if (need.volunteers.some(vol => vol.id === userId)) {
      throw new ConflictException("Voluntário já cadastrado na necessidade.");
  }
    need.volunteers.push(volunteer);
    await this.needVolunteerRepository.save(need)
    return need
  }

  async canceled(id: string, userId: string): Promise<NeedVolunteers> {
    const volunteer = await this.verifyIfUserExits.verifyIfUserExits(userId)
    userValidationsToAccepted(volunteer);
    const need = await this.find(id);
    const index = need.volunteers.findIndex(vol => vol.id === userId);
    
    if (index > -1) {
      need.volunteers.splice(index, 1);
    }
    else {
      throw new NotFoundException("Voluntário não associado à demanda.");
    }
  
    if(need.volunteers.length === 0){
      need.status = Status.PENDING;
    }
     
    await this.needVolunteerRepository.save(need)
    return need
  }

}