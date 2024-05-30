import { NeedVolunteers } from "../../entities/needVolunteers.entity";
import { Priority } from "../../enums/enumPriority";
import { Status } from "../../enums/enumsStatus";

export class ResponseNeedVolunteerDTO {
  
  coordinator: string;
  title: string;
  description: string;
  volunteers: string[];
  shelter: string;
  status: Status;
  priority: Priority;
  limitDate: Date;
  specificSkills: string[];
  workHours: number;
  created: Date;


  constructor(needVolunteer: NeedVolunteers){
    this.coordinator = needVolunteer.coordinator.name,
    this.title = needVolunteer.title,
    this.description = needVolunteer.description,
    this.shelter = needVolunteer.shelter,
    this.volunteers = needVolunteer.volunteers,
    this.status = needVolunteer.status,
    this.limitDate = needVolunteer.limitDate,
    this.specificSkills = needVolunteer.specificSkills,
    this.workHours = needVolunteer.workHours,
    this.created = needVolunteer.created
  }
  
}