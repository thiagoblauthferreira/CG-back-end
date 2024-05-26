import { User } from "src/modules/auth/entities/auth.enity";
import { NeedVolunteers } from "../../entities/needVolunteers.entity";
import { Priority } from "../../enums/enumPriority";
import { Status } from "../../enums/enumsStatus";

export class ResponseNeedVolunteerUpdateDTO {
  
  coordinator: string;
  title: string;
  description: string;
  volunteers: User[];
  shelter: string;
  status: Status;
  priority: Priority;
  limitDate: Date;
  specificSkills: string[];
  workHours: number;
  created: Date;
  update: Date;


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
    this.created = needVolunteer.created,
    this.update = needVolunteer.updated
  }
  
}