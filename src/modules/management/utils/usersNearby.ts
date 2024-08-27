import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Status, User } from "src/modules/auth/entities/auth.enity";
import { Repository } from "typeorm";
import { Management } from "../entities/management.entity";

@Injectable()
export class UserNearby {
  constructor(    
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
      )
    {}

    public async usersNearby(management: Management, radius: number){
    
      const managementLatitude = management.collectPoint.latitude;
      const managementLongitude = management.collectPoint.longitude;
  
      const query = this.userRepository
        .createQueryBuilder("user")
        .select(["user.name", "user.email"]) 
        .addSelect(["address.latitude", "address.longitude"]) 
        .leftJoin("user.address", "address")
        .where(`6371 * acos(cos(radians(:managementLatitude)) * cos(radians(address.latitude)) * cos(radians(address.longitude) - radians(:managementLongitude)) + sin(radians(:managementLatitude)) * sin(radians(address.latitude))) < :radius`, {
          managementLatitude,
          managementLongitude,
          radius
        })
        .andWhere("user.status = :status", { status: Status.APPROVED })
        .andWhere("user.isDonor = :isDonor", { isDonor: true })
        return await query.getMany();
    }
}