import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ScheduleService } from "./schedule.service";
import { RestoresDTO } from "./dto/restoresDTO";

@ApiTags('Schedule')
@Controller('schedule')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ScheduleController {
  managementService: any;

  constructor(
    private scheduleService: ScheduleService
  ){}

  @Post('/restore-schedules')
  async backupSchedule(@Body() id: RestoresDTO) { 
    return await this.managementService.sendEmailByNearbyBackup(id.id);
  }



}