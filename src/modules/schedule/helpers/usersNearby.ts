import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import logger from "src/logger";
import { Status, User } from "src/modules/auth/entities/auth.enity";
import { Management } from "src/modules/management/entities/management.entity";
import { Repository } from "typeorm";


@Injectable()
export class UserNearby {
  constructor(    
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
      )
    {}

    public async usersNearby(management: Management){
      
      const radius = 20;
     
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

    /*
      .createQueryBuilder("user")
      .select(["user.id", "user.name", "user.username", "user.phone", "user.birthDate", "user.isDonor", "user.isCoordinator", "user.roles", "user.status"]) // Select only the fields you want to return
      .addSelect(["address.latitude", "address.longitude"]) // Select only the fields you want from the address
      .leftJoin("user.address", "address")
      .where(`6371 * acos(cos(radians(:userLatitude)) * cos(radians(address.latitude)) * cos(radians(address.longitude) - radians(:userLongitude)) + sin(radians(:userLatitude)) * sin(radians(address.latitude))) < :radius`, {
        userLatitude,
        userLongitude,
        radius
      })
      .andWhere("user.id != :userId", { userId });
    
    */
}