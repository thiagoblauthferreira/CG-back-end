import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ManagementService } from "./management.service";
import { ManagementController } from "./management.controller";
import { Management } from "./entities/management.entity";
import { NeedModule } from "../need/need.module";
import { NeedItem } from "../need/entities/needItems.entity";
import { NeedVolunteers } from "../need/entities/needVolunteers.entity";
import { FindNeedsVolunteer } from "./utils/findNeedVolunteer";
import { FindNeedsItem } from "./utils/findNeedItem";
import { Address } from "../auth/entities/adress.enity";
import { VerifyIfUserExits } from "./validators/verifyIfUserExits";
import { User } from "../auth/entities/auth.enity";
import { UserNearby } from "./utils/usersNearby";
import { MailModule } from "../mail/mail.module";
import { ScheduleModule } from "@nestjs/schedule";
import { Shelter } from "../shelter/entities/shelter.entity";
import { VerifyIfShelterExits } from "./validators/verifyIfShelterExits";

@Module({
  imports: [
    TypeOrmModule.forFeature([Management, NeedItem, NeedVolunteers, Address, User, Shelter]),
    forwardRef(() => NeedModule),
    forwardRef(() => Shelter),
    ScheduleModule.forRoot(),
    ScheduleModule,
    MailModule
  ],
  providers: [ManagementService, FindNeedsItem, FindNeedsVolunteer, VerifyIfUserExits, UserNearby, VerifyIfShelterExits],
  controllers: [ManagementController],
  exports: [TypeOrmModule, ManagementService],
})
export class ManagementModule {}
