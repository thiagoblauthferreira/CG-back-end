import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateNeedItemDTO } from "./dto/request/createNeedItemDTO";
import { NeedItemFactory } from "./factory/needItem.factory";
import { NeedItem } from "./entities/needItems.entity";
import { VerifyIfUserExits } from "./validator/user/verifyIfUserExits";
import { ValidationIfUserIsCoordinator } from "./validator/user/validationIfUserIsCoordinator";
import { ValidationIfUserIsApproved } from "./validator/user/validationIfUserIsAproved";
import { validatorUser } from "./validator/user/userValidador";
import { VerifyIfDateIsBefore } from "./validator/need/updateValidator/verifyIfDateIsBefore";
import { VerifyIfNeedIsComplete } from "./validator/need/updateValidator/verifyIfNeedIsComplete";
import { validatorNeedsUpdate } from "./validator/need/updateValidator/needValidador";
import { validatorNeedsCreate } from "./validator/need/createValidator/needValidadorCreate";
import { VerifyIfDateIsBeforeCreate } from "./validator/need/createValidator/verifyIfDateIsBeforeCreate";

@Injectable()
export class NeedItemService {
  constructor(
  @InjectRepository(NeedItem)
  private needItemRepository: Repository<NeedItem>,
  private verifyIfUserExits: VerifyIfUserExits,
  private needItemFactory: NeedItemFactory,
  private validationIfUserIsCoordinator: ValidationIfUserIsCoordinator,
  private validationIfUserIsApproved: ValidationIfUserIsApproved,
  private verifyIfLimitDateIsBefore: VerifyIfDateIsBefore,
  private verifyIfNeedIsComplete: VerifyIfNeedIsComplete,
  private verifyIfLimitDateIsBeforeCreate: VerifyIfDateIsBeforeCreate
  )
  {}

  async create (createNeedItemDTO: CreateNeedItemDTO): Promise<NeedItem>{

    validatorNeedsCreate(createNeedItemDTO, this.verifyIfLimitDateIsBeforeCreate)

    const coordinator = await this.verifyIfUserExits.verifyIfUserExits(createNeedItemDTO.coordinatorId);

    validatorUser(coordinator, this.validationIfUserIsApproved, this.validationIfUserIsCoordinator);

    const need = this.needItemFactory.toItemEntity(coordinator, createNeedItemDTO);
    
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

    
   
    await validatorUser(need.coordinator, this.validationIfUserIsApproved, this.validationIfUserIsCoordinator);
    //ficaram dois código, um para verificar o update e outro para verificar a própria need
    validatorNeedsUpdate(update, this.verifyIfLimitDateIsBefore)

   //verificação da need
    validatorNeedsUpdate(need, this.verifyIfNeedIsComplete)

    const updateNeed = Object.assign(need, update)

    return await this.needItemRepository.save(updateNeed)
  }

  async delete(id: string) {

  const need = await this.findById(id);
  validatorUser(need.coordinator, this.validationIfUserIsApproved, this.validationIfUserIsCoordinator);
    if(need){
      await this.needItemRepository.remove(need);
      return true;
    }
  }
}


