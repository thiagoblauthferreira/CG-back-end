import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { NeedVolunteers } from './entities/needVolunteers.entity';
import { NeedVolunteerService } from './needVolunteer.service';
import { NeedVolunteerController } from './needVolunteer.controller';
import { NeedItem } from './entities/needItems.entity';
import { NeedItemService } from './needItem.service';
import { User } from '../auth/entities/auth.enity';
import { NeedItemController } from './needItem.controller';
import { NeedItemFactory } from './factory/needItem.factory';
import NeedVolunteerFactory from './factory/needVolunteerFactory';
import { VerifyIfUserExits } from './validator/user/verifyIfUserExits';
import { ValidationIfUserIsCoordinator } from './validator/user/validationIfUserIsCoordinator';
import { ValidationIfUserIsApproved } from './validator/user/validationIfUserIsAproved';
import { VerifyIfDateIsBefore } from './validator/need/updateValidator/verifyIfDateIsBefore';
import { VerifyIfNeedIsComplete } from './validator/need/updateValidator/verifyIfNeedIsComplete';
import { VerifyIfDateIsBeforeCreate } from './validator/need/createValidator/verifyIfDateIsBeforeCreate';


@Module({
  imports: [TypeOrmModule.forFeature([NeedVolunteers, NeedItem, User])
], 
  providers: [NeedVolunteerService, NeedItemService, NeedItemFactory, NeedVolunteerFactory, VerifyIfUserExits, ValidationIfUserIsCoordinator,
    ValidationIfUserIsApproved, VerifyIfDateIsBefore, VerifyIfNeedIsComplete, VerifyIfDateIsBeforeCreate],
  controllers: [NeedVolunteerController, NeedItemController],
})
export class NeedModule {}