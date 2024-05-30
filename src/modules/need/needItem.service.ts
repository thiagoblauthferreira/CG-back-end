import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
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

@Injectable()
export class NeedItemService {
  constructor(
  @InjectRepository(NeedItem)
  private needItemRepository: Repository<NeedItem>,
  private verifyIfUserExits: VerifyIfUserExits,
  )
  {}

  async create (createNeedItemDTO: CreateNeedItemDTO): Promise<NeedItem>{

    validateCreate(createNeedItemDTO)

    const coordinator = await this.verifyIfUserExits.verifyIfUserExits(createNeedItemDTO.coordinatorId);

    userValidations(coordinator);

    const need = toItemEntity(coordinator, createNeedItemDTO);
    
    return await this.needItemRepository.save(need)
        
  }

  async findById(id: string): Promise<NeedItem>{
    const need = await this.needItemRepository.findOne({
      where: { id: id},
      relations: ['coordinator']
    });
    if(!need){
      throw new HttpException("Need not found.", HttpStatus.BAD_REQUEST);
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
}


