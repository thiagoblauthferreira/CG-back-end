import { Status } from "src/modules/need/enums/enumsStatus";
import { ResponseAddressDTO } from "./responseAddressDTO";
import { Priority } from "src/modules/need/enums/enumPriority";
import { NeedVolunteers } from "src/modules/need/entities/needVolunteers.entity";
import { UserResponseDTO } from "./userResponseDTO";

export class ResponseNeedVolunteerUpdateDTO {
  id: string;
  title: string;
  coordinator: string;
  coordinator_username: string;  
  description: string;
  shelter_id: string;
  shelter_name: string;
  shelter_phone: string;
  shelter_address: ResponseAddressDTO;
  status: Status;
  priority: Priority;
  limitDate: Date;
  specificSkills: string[];
  workHours: number;
  created: Date;
  update: Date;


  constructor(needVolunteer: NeedVolunteers){
    this.coordinator = needVolunteer.coordinator.name,
    this.coordinator_username = needVolunteer.coordinator.username,
    this.title = needVolunteer.title,
    this.description = needVolunteer.description,
    this.shelter_id = needVolunteer.shelter.id,
    this.shelter_name = needVolunteer.shelter.name,
    this.shelter_phone = needVolunteer.shelter.phone  
    this.status = needVolunteer.status,
    this.limitDate = needVolunteer.limitDate,
    this.specificSkills = needVolunteer.specificSkills,
    this.workHours = needVolunteer.workHours
  }
  
}