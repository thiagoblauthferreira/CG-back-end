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
import { validatorGeneric } from "./validator/generics/genericValidador";
import { HasSuspectChars } from "./validator/generics/hasSuspectChars";
import { VerifyIfDateIsBefore } from "./validator/need/updateValidator/verifyIfDateIsBefore";
import { VerifyIfNeedIsComplete } from "./validator/need/updateValidator/verifyIfNeedIsComplete";
import { validatorNeedsUpdate } from "./validator/need/updateValidator/needValidador";

@Injectable()
export class NeedItemService {
  constructor(
  @InjectRepository(NeedItem)
  private needItemRepository: Repository<NeedItem>,
  private verifyIfUserExits: VerifyIfUserExits,
  private needItemFactory: NeedItemFactory,
  private validationIfUserIsCoordinator: ValidationIfUserIsCoordinator,
  private validationIfUserIsApproved: ValidationIfUserIsApproved,
  private validationChars: HasSuspectChars,
  private verifyIfLimitDateIsBefore: VerifyIfDateIsBefore,
  private verifyIfNeedIsComplete: VerifyIfNeedIsComplete
  )
  {}

  async create (createNeedItemDTO: CreateNeedItemDTO): Promise<NeedItem>{

    validatorGeneric(createNeedItemDTO, this.validationChars)

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

    validatorGeneric(update, this.validationChars)

    const need = await this.findById(id);

    validatorUser(need.coordinator, this.validationIfUserIsApproved, this.validationIfUserIsCoordinator);
   
    const updateNeed = Object.assign(need, update)
    validatorNeedsUpdate(updateNeed, this.verifyIfLimitDateIsBefore, this.verifyIfNeedIsComplete)


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


