import { User } from "src/modules/auth/entities/auth.enity";
import { CreateVolunteerDTO } from "../dto/request/createNeedVolunteerDTO";
import { NeedVolunteers } from "../entities/needVolunteers.entity";
import { Shelter } from "src/modules/shelter/entities/shelter.entity";

  export function toNeedVolunteerEntity(user: User, shelter: Shelter, createNeedVolunteerDTO: CreateVolunteerDTO): NeedVolunteers{
    const needVolunteers = new NeedVolunteers()
    needVolunteers.coordinator = user;
    needVolunteers.title = createNeedVolunteerDTO.title;
    needVolunteers.description = createNeedVolunteerDTO.description,
    needVolunteers.specificSkills = createNeedVolunteerDTO.specificSkills;
    needVolunteers.shelter = shelter;
    needVolunteers.status = createNeedVolunteerDTO.status;
    needVolunteers.priority = createNeedVolunteerDTO.priority;
    needVolunteers.workHours = createNeedVolunteerDTO.workHours;
    needVolunteers.limitDate = createNeedVolunteerDTO.limitDate;
  
    return needVolunteers;
   
  }
