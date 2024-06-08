import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateNeedItemDTO } from "./dto/request/createNeedItemDTO";
import { NeedItem } from "./entities/needItems.entity";
import { VerifyIfUserExits } from "./validator/user/verifyIfUserExits";
import { toItemEntity } from "./factory/needItem.factory";
import { userValidations } from "./validator/user/userValidations";
import { validateCreate } from "./validator/need/createValidator/createVerifications";
import { validateUpdate } from "./validator/need/updateValidator/updateValidations";
import { validateUpdateDTO } from "./validator/need/updateValidator/updateValidationsDTO";
import { userValidationsToAccepted } from "./validator/user/userValidationsToAccepted";
import { acceptedValidate } from "./validator/need/accepted/acceptedValidations";
import { VerifyIfShelterExits } from "./validator/shelter/verifyIfShelterExits";

@Injectable()
export class NeedItemService {
  constructor(
  @InjectRepository(NeedItem)
  private needItemRepository: Repository<NeedItem>,
  private verifyIfUserExits: VerifyIfUserExits,
  private verifyIfShelterExists: VerifyIfShelterExits,
  )
  {}

  async create (createNeedItemDTO: CreateNeedItemDTO): Promise<NeedItem>{

    validateCreate(createNeedItemDTO)

    const coordinator = await this.verifyIfUserExits.verifyIfUserExits(createNeedItemDTO.coordinatorId);

    userValidations(coordinator);

    const shelter = await this.verifyIfShelterExists.verifyIfShelterExits(createNeedItemDTO.shelterId)

    const need = toItemEntity(coordinator,shelter, createNeedItemDTO);
    
    return await this.needItemRepository.save(need)
        
  }

  async findById(id: string): Promise<NeedItem>{
    const need = await this.needItemRepository.findOne({
      where: { id: id},
      relations: ['coordinator']
    });
    if(!need){
      throw new NotFoundException('Necessidade não encontrada');
    }
    return need;
 }

  async update(id: string, update: Partial<NeedItem>) {

    const need = await this.findById(id);

    userValidations(need.coordinator);
    //ficaram dois código, um para verificar o update e outro para verificar a própria need
    validateUpdateDTO(update)

    //verificação da need
    validateUpdate(need)

    const updateNeed = Object.assign(need, update)

    return await this.needItemRepository.save(updateNeed)
  }

  async delete(id: string) {

  const need = await this.findById(id);
  userValidations(need.coordinator);
    
  if(need){
    await this.needItemRepository.remove(need);
    return true;
    }
  }

  async findAll(): Promise<NeedItem[]>{
    return await this.needItemRepository.find({
      relations: ['coordinator', 'donor']
    })
  }

  async accepted(id: string, userId: string): Promise<NeedItem> {
    const donor = await this.verifyIfUserExits.verifyIfUserExits(userId)
    userValidationsToAccepted(donor);
    const need = await this.findById(id);
    acceptedValidate(need);
    need.donor = donor;
    return await this.needItemRepository.save(need)
              
   }

   /*async acceptedCompany(id: string, companyId: string): Promise<NeedItem> {
    const donor = await this.verifyIfUserExits.verifyIfUserExits(companyId)
   
    userValidationsToAccepted(donor);
    const need = await this.findById(id);
    acceptedValidate(need);
    need.donor = donor;
    return await this.needItemRepository.save(need)
              
   }*/
}


