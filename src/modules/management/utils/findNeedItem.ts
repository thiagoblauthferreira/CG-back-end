import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NeedItem } from "src/modules/need/entities/needItems.entity";
import { Repository } from "typeorm";

@Injectable()
export class FindNeedsItem{

  constructor(
    @InjectRepository(NeedItem)
    private needItemRepository: Repository<NeedItem>,
  ){}

  async findNeedItemById(id: string): Promise<NeedItem>{
    const need = await this.needItemRepository.findOne({
      where: { id: id }
    });
    if(!need){
      return null
    }
    return need;
  }
}