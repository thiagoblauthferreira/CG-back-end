import { User } from "src/modules/auth/entities/auth.enity";
import { CreateNeedItemDTO} from "../dto/request/createNeedItemDTO"
import { NeedItem } from "../entities/needItems.entity";
import { Shelter } from "src/modules/shelter/entities/shelter.entity";

 export function toItemEntity(user: User, shelter: Shelter, createNeedItemDTO: CreateNeedItemDTO): NeedItem{
  
    return new NeedItem (
      user,
      createNeedItemDTO.title,
      createNeedItemDTO.description,
      shelter,
      createNeedItemDTO.status,
      createNeedItemDTO.priority,
      createNeedItemDTO.limitDate,
      createNeedItemDTO.item
    )
    
  }
