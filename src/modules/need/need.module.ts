import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { NeedVolunteers } from './entities/needVolunteers.entity';
import { NeedVolunteerService } from './needVolunteer.service';
import { NeedVolunteerController } from './needVolunteer.controller';
import { NeedItem } from './entities/needItems.entity';
import { NeedItemService } from './needItem.service';
import { User } from '../auth/entities/auth.enity';
import { NeedItemController } from './needItem.controller';
import { VerifyIfUserExits } from './validator/user/verifyIfUserExits';
import { Shelter } from '../shelter/entities/shelter.entity';
import { VerifyIfShelterExits } from './validator/shelter/verifyIfShelterExits';


@Module({
  imports: [TypeOrmModule.forFeature([NeedVolunteers, NeedItem, User, Shelter])], 
  providers: [NeedVolunteerService, NeedItemService, VerifyIfUserExits, VerifyIfShelterExits],
  controllers: [NeedVolunteerController, NeedItemController],
})
export class NeedModule {}