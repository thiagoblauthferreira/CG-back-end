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


@Module({
  imports: [TypeOrmModule.forFeature([NeedVolunteers, NeedItem, User])], 
  providers: [NeedVolunteerService, NeedItemService, VerifyIfUserExits],
  controllers: [NeedVolunteerController, NeedItemController],
})
export class NeedModule {}