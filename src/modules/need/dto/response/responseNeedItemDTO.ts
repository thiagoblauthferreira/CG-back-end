import { Shelter } from "src/modules/shelter/entities/shelter.entity";
import { NeedItem } from "../../entities/needItems.entity";
import { Priority } from "../../enums/enumPriority";
import { Status } from "../../enums/enumsStatus";

export class ResponseNeedItemDTO {
  
  coordinator: string;
  title: string;
  description: string;
  shelter: Shelter;
  status: Status;
  priority: Priority;
  limitDate: Date;
  item: { [key: string]: number};
  created: Date;
  donor: string;


  constructor(needItem: NeedItem){
    this.coordinator = needItem.coordinator.name,
    this.title = needItem.title,
    this.description = needItem.description,
    this.shelter = needItem.shelter,
    this.status = needItem.status,
    this.limitDate = needItem.limitDate,
    this.item = needItem.item
    this.created = needItem.created,
    this.donor = needItem.donor?.name
  }
  
}