import { NeedItem } from "src/modules/need/entities/needItems.entity";
import { NeedVolunteers } from "src/modules/need/entities/needVolunteers.entity";
import { Management } from "../../entities/management.entity";
import { ResponseAddressDTO } from "./addressResponseDTO";
import { UserResponseDTO } from "./userResponseDTO";

export class ResponseDefaultManagement {

  private id: string;
  private collectionData: Date;
  private coordinator: UserResponseDTO;
  private collectionPoint: ResponseAddressDTO;
  private needItem?: NeedItem[];
  private needVolunteer?: NeedVolunteers[];

  constructor (management: Management){
    this.id = management.id,
    this.collectionData = management.collectionData,
    this.coordinator = new UserResponseDTO(management.coordinator),
    this.collectionPoint = new ResponseAddressDTO(management.collectPoint)
    this.needItem = management.needItem,
    this.needVolunteer = management.needVolunteer
  }
  
}