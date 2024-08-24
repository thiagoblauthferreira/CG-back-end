import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ManagementService } from "./management.service";
import { ManagementController } from "./management.controller";
import { NeedModule } from "../need/need.module";
import { NeedItem } from "../need/entities/needItems.entity";
import { NeedVolunteers } from "../need/entities/needVolunteers.entity";
import { Address } from "../auth/entities/adress.enity";
import { User } from "../auth/entities/auth.enity";
import { MailModule } from "../mail/mail.module";
import { Shelter } from "../shelter/entities/shelter.entity";
import { Management } from "./entities/management.entity";
import { FindNeedsItem } from "./utils/findNeedItem";
import { FindNeedsVolunteer } from "./utils/findNeedVolunteer";
import { VerifyIfUserExits } from "../need/validator/user/verifyIfUserExits";
import { VerifyIfShelterExits } from "../need/validator/shelter/verifyIfShelterExits";


@Module({
  imports: [
    TypeOrmModule.forFeature([Management, NeedItem, NeedVolunteers, Address, User, Shelter]),
    forwardRef(() => NeedModule),
    forwardRef(() => Shelter),
    MailModule
  ],
  providers: [ManagementService, FindNeedsItem, FindNeedsVolunteer, VerifyIfUserExits, VerifyIfShelterExits],
  controllers: [ManagementController],
  exports: [TypeOrmModule, ManagementService],
})
export class ManagementModule {}