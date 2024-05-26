import { NeedItem } from "../../entities/needItems.entity";
import { Priority } from "../../enums/enumPriority";
import { Status } from "../../enums/enumsStatus";

export class ResponseNeedItemUpdateDTO {
  
  coordinator: string;
  title: string;
  description: string;
  shelter: string;
  status: Status;
  priority: Priority;
  limitDate: Date;
  item: { [key: string]: number};
  created: Date;
  update: Date;


  constructor(needItem: NeedItem){
    this.coordinator = needItem.coordinator.name,
    this.title = needItem.title,
    this.description = needItem.description,
    this.shelter = needItem.shelter,
    this.status = needItem.status,
    this.limitDate = needItem.limitDate,
    this.item = needItem.item
    this.created = needItem.created,
    this.update = needItem.updated
  }
  
}