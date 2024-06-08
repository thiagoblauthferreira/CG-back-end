import { Shelter } from "src/modules/shelter/entities/shelter.entity";
import { NeedVolunteers } from "../../entities/needVolunteers.entity";
import { Priority } from "../../enums/enumPriority";
import { Status } from "../../enums/enumsStatus";

export class ResponseNeedVolunteerUpdateDTOToList{
  
  id: string;
  coordinator: string;
  title: string;
  description: string;
  volunteers: string[];
  shelter: Shelter;
  status: Status;
  priority: Priority;
  limitDate: Date;
  specificSkills: string[];
  workHours: number;
  created: Date;
  update: Date;


  constructor(needVolunteer: NeedVolunteers){
    this.id = needVolunteer.id
    this.coordinator = needVolunteer.coordinator.name,
    this.title = needVolunteer.title,
    this.description = needVolunteer.description,
    this.shelter = needVolunteer.shelter,
    this.volunteers = needVolunteer.volunteers,
    this.status = needVolunteer.status,
    this.limitDate = needVolunteer.limitDate,
    this.specificSkills = needVolunteer.specificSkills,
    this.workHours = needVolunteer.workHours,
    this.created = needVolunteer.created,
    this.update = needVolunteer.updated
  }
  
}