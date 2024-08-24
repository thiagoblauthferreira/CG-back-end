import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { Management } from '../management/entities/management.entity';
import { UserNearby } from './helpers/usersNearby';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailQueue } from './entity/emailQueue.entity';
import { User } from '../auth/entities/auth.enity';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Management, EmailQueue, User, Schedule]),
    MailModule,
  ],
  providers: [ScheduleService, UserNearby],
  controllers: [ScheduleController],
  exports: [ScheduleService],
})
export class Schedule {}
