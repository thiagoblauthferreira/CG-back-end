import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NeedVolunteers } from "./entities/needVolunteers.entity";
import { CreateVolunteerDTO } from "./dto/request/createNeedVolunteerDTO";
import NeedVolunteerFactory from "./factory/needVolunteerFactory";
import { VerifyIfUserExits } from "./validator/user/verifyIfUserExits";
import { ValidationIfUserIsCoordinator } from "./validator/user/validationIfUserIsCoordinator";
import { ValidationIfUserIsApproved } from "./validator/user/validationIfUserIsAproved";
import { validatorUser } from "./validator/user/userValidador";

@Injectable()
export class NeedVolunteerService {
  constructor(
  @InjectRepository(NeedVolunteers)
  private readonly needVolunteerRepository: Repository<NeedVolunteers>,
  private readonly verifyIfUserExits: VerifyIfUserExits,
  private readonly needVolunteerFactory: NeedVolunteerFactory,
  private validationIfUserIsCoordinator: ValidationIfUserIsCoordinator,
  private validationIfUserIsApproved: ValidationIfUserIsApproved,
  )
  {}


  async create (createVolunteerDTO: CreateVolunteerDTO){

    const coordinator = await this.verifyIfUserExits.verifyIfUserExits(createVolunteerDTO.coordinatorId);
    
    validatorUser(coordinator, this.validationIfUserIsApproved, this.validationIfUserIsCoordinator);

    const need  = this.needVolunteerFactory.toNeedVolunteerEntity(coordinator, createVolunteerDTO);

    return await this.needVolunteerRepository.save(need);

  }

  async update (id: string, update: Partial<NeedVolunteers>){
    
    const need = await this.find(id);

    validatorUser(need.coordinator, this.validationIfUserIsApproved, this.validationIfUserIsCoordinator);

    return await this.needVolunteerRepository.save({...need, ...update});

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
    validatorUser(need.coordinator, this.validationIfUserIsApproved, this.validationIfUserIsCoordinator);
    if (need){
      await this.needVolunteerRepository.remove(need);
      return true
    }
    return false;

  }

}