import { User } from "src/modules/auth/entities/auth.enity";
import { CreateVolunteerDTO } from "../dto/request/createNeedVolunteerDTO";
import { NeedVolunteers } from "../entities/needVolunteers.entity";
import { Shelter } from "src/modules/shelter/entities/shelter.entity";

  export function toNeedVolunteerEntity(user: User, shelter: Shelter, createNeedVolunteerDTO: CreateVolunteerDTO): NeedVolunteers{

    return new NeedVolunteers(
      user,
      createNeedVolunteerDTO.title,
      createNeedVolunteerDTO.description,
      createNeedVolunteerDTO.specificSkills,
      shelter,
      createNeedVolunteerDTO.status,
      createNeedVolunteerDTO.priority,
      createNeedVolunteerDTO.workHours,
      createNeedVolunteerDTO.limitDate

    )
  
  }
