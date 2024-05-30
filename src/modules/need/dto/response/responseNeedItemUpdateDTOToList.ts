import { NeedItem } from "../../entities/needItems.entity";
import { Priority } from "../../enums/enumPriority";
import { Status } from "../../enums/enumsStatus";

export class ResponseNeedItemUpdateDTOToList {

  id: string;
  title: string;
  description: string;
  shelter: string;
  status: Status;
  priority: Priority;
  limitDate: Date;
  item: { [key: string]: number};
  created: Date;
  update: Date;
  donor: string;


  constructor(needItem: NeedItem){
    this.id = needItem.id    
    this.title = needItem.title,
    this.description = needItem.description,
    this.shelter = needItem.shelter,
    this.status = needItem.status,
    this.limitDate = needItem.limitDate,
    this.item = needItem.item
    this.created = needItem.created,
    this.update = needItem.updated,
    this.donor = needItem.donor?.name || '';
  }
  
}