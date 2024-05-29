import { User } from "src/modules/auth/entities/auth.enity";
import { CreateNeedItemDTO} from "../dto/request/createNeedItemDTO"
import { NeedItem } from "../entities/needItems.entity";

 export function toItemEntity(user: User, createNeedItemDTO: CreateNeedItemDTO): NeedItem{
  
    return new NeedItem (
      user,
      createNeedItemDTO.title,
      createNeedItemDTO.description,
      createNeedItemDTO.shelterId,
      createNeedItemDTO.status,
      createNeedItemDTO.priority,
      createNeedItemDTO.limitDate,
      createNeedItemDTO.item
    )
    
  }
