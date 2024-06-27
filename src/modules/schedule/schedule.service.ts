import { Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { CreateScheduleDTO } from "../management/dto/request/createSchenduleDTO";
import logger from "src/logger";
import { Schedule } from "./schedule.module";
import { CronJob } from 'cron';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);
  managementRepository: any;
  scheduleService: any;

  @Cron('45 * * * * *')
  handleCron() {
    this.logger.debug('Called when the current second is 45');
  }


  /*async sendEmailByNearbyBackup(id: string): Promise<void>{ 
    try{
      const admin = await this.verifyIfUserExists.verifyIfUserExits(id);
   
      if (!admin.roles.some(role => role === 'admin')) {
        throw new ForbiddenException('Sem autorização para fazer o backup.');
      }
     const schedules = await this.scheduleService.findAll();
    
      schedules.forEach(async s => {
          await this.sendEmailsJob(s);
      })
  }
   catch (error) {
    logger.error(error);
    throw new InternalServerErrorException('Erro ao enviar as notificações.')
  }
    
  }

  async sendEmailByNearby(createScheduleDTO: CreateScheduleDTO): Promise<void> {
    try {
      const id = createScheduleDTO.managementId;
      const management = await this.managementRepository.findOne({
        where: { id: id },
        relations: ["collectPoint"]
      });
  
      if (!management) {
        throw new NotFoundException('Demanda não encontrada.');
      }
  
      const schedule = await this.scheduleService.create(createScheduleDTO, management);
      await this.sendEmailsJob(schedule);
    } catch (error) {
      logger.error(error);
      throw new InternalServerErrorException('Erro ao enviar as notificações.');
    }
  }

  private async sendEmailsJob(schedule: Schedule) {
    try {
      const job = new CronJob(schedule.scheduleTime, async () => {
        try {
          const nearbyUsers = await this.usersNearby.usersNearby(schedule.management, schedule.radius);
  
          const emailPromises = nearbyUsers.map(async user => {
            console.log(user.email);
          //  await this.mailService.sendNearByUsers(user.email, user.name); // Linha descomentada
          });
  
          await Promise.all(emailPromises);
  
          logger.info(`CronJob executado para ${schedule.scheduleTime} com ID job_${schedule.targetDate.getTime()}`);
        } catch (error) {
          logger.error('Erro ao executar tarefa agendada:', error);
          throw new InternalServerErrorException('Erro ao enviar e-mails para usuários próximos.');
        }
      });
  
      this.schedulerRegistry.addCronJob(`job_${schedule.targetDate.getTime()}`, job);
  
      logger.info(`CronJob agendado para ${schedule.scheduleTime} com ID job_${schedule.targetDate.getTime()}`);
  
      job.start();
    } catch (error) {
      logger.error('Erro ao configurar a tarefa agendada:', error);
      throw new InternalServerErrorException('Erro ao configurar a tarefa agendada.');
    }


    @Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduledJobRepository: Repository<Schedule>,
  ){}

  async create(createScheduleDTO: CreateScheduleDTO, management: Management){
   const targetDate = management.collectionDate;
   const scheduleTime = new Date(targetDate.getTime() - createScheduleDTO.hoursBefore * 60 * 60 * 1000);
   if (scheduleTime >= management.collectionDate) {
     throw new UnprocessableEntityException('A data de envio do e-mail deve ser informada pelo menos 1h antes.');
   }
   const schedule = new Schedule()
   schedule.management = management;
   schedule.targetDate = targetDate;
   schedule.date = management.collectionDate;
   schedule.hoursBefore = createScheduleDTO.hoursBefore;
   schedule.scheduleTime = scheduleTime;
   schedule.radius = createScheduleDTO.radius;
   return await this.scheduledJobRepository.save(schedule);
 
  }

  async findAll(){
    const date = new Date();
    return await this.scheduledJobRepository.createQueryBuilder('schedule')
      .where('schedule.sent = :status', { status: false })
      .andWhere('schedule.scheduleTime > :date', { date: date })
      .getMany()
   }

}
  }*/

}