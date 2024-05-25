import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../auth/entities/auth.enity";
import { CreateNeedItemDTO } from "./dto/request/createNeedItemDTO";
import { NeedItemFactory } from "./factory/needItem.factory";
import { NeedItem } from "./entities/needItems.entity";

@Injectable()
export class NeedItemService {
  constructor(
  @InjectRepository(NeedItem)
  private readonly needItemRepository: Repository<NeedItem>,
  @InjectRepository(User)
  private readonly userRepository: Repository<User>,
  private needItemFactory: NeedItemFactory
  )
  {}

  async create (createNeedItemDTO: CreateNeedItemDTO): Promise<NeedItem>{

    const coordinator = await this.userRepository.findOne({
      where: { id: createNeedItemDTO.coordinatorId}
    });
  
    if(!coordinator ){
      throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
    }

    const need = this.needItemFactory.toItemEntity(coordinator, createNeedItemDTO);
    
    return this.needItemRepository.save(need)
        
  }

  async findById(id: string): Promise<NeedItem>{

    return await this.needItemRepository.findOne({
      where: { id: id},
      relations: ['coordinator']
    });
 }

  async update(id: string, update: Partial<NeedItem>) {

    const need = await this.findById(id);
    if(!need){
      throw new HttpException("Need not found.", HttpStatus.BAD_REQUEST);
    }
    return await this.needItemRepository.save({...need, ...update})
  }

 async delete(id: string) {

  const need = await this.findById(id);
  if(need){
    await this.needItemRepository.remove(need);
    return true;
  }
}
}