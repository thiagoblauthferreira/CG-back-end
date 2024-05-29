import { User } from "src/modules/auth/entities/auth.enity";
import { CreateVolunteerDTO } from "../dto/request/createNeedVolunteerDTO";
import { NeedVolunteers } from "../entities/needVolunteers.entity";

  export function toNeedVolunteerEntity(user: User, createNeedVolunteerDTO: CreateVolunteerDTO): NeedVolunteers{

    return new NeedVolunteers(
      user,
      createNeedVolunteerDTO.title,
      createNeedVolunteerDTO.description,
      createNeedVolunteerDTO.specificSkills,
      createNeedVolunteerDTO.shelterId,
      createNeedVolunteerDTO.status,
      createNeedVolunteerDTO.priority,
      createNeedVolunteerDTO.workHours,
      createNeedVolunteerDTO.limitDate

    )
  
  }
