import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import logger from "src/logger";
import { InjectRepository } from "@nestjs/typeorm";
import { Management } from "../management/entities/management.entity";
import { Repository } from "typeorm";
import { EmailQueue } from "./entity/emailQueue.entity";
import { UserNearby } from "./helpers/usersNearby";


@Injectable()
export class ScheduleService {
  private readonly qtdEmails = 200;
  constructor(
    @InjectRepository(Management)
    private managementRepository: Repository<Management>,
    @InjectRepository(EmailQueue)
    private emailRepository: Repository<EmailQueue>,
    private usersNearby: UserNearby
  ){}

  

  @Cron(CronExpression.EVERY_HOUR)
  async sendEmailQueue() {
    try{
      logger.info(`Start sending ${this.qtdEmails} emails every hour.`)
    const emails: EmailQueue[] = await this.imminentDemand();

      if(!emails || emails.length === 0){
        logger.info("No emails to send.");
        return
      }

    for (const email of await emails){
      const userName = email.user.name;
      const userEmail = email.user.email;
      const collectionDate = email.management.collectionDate;
      const collectPoint = email.management.collectPoint;

      await console.log(userEmail, `Coleta Agendada - ${collectionDate}`, `Olá ${userName}, sua coleta está agendada para ${collectionDate} no ponto ${collectPoint}.`);
    
      email.processed = true;
      await this.emailRepository.save(email);
      logger.info(`E-mail sent to ${userName} (${userEmail})`);
    }

    logger.info(`End the send ${this.qtdEmails} e-mails every hour`)

  }catch (error) {
    logger.error(error);
    throw new InternalServerErrorException('Error while sent.' + error)
  }
  }
  //a cada dois dias, enviar em array.
  @Cron(CronExpression.EVERY_MINUTE)
  async addUserInQueue(): Promise<void>{
    try{
    const demand = await this.recentDemand()
    
    if(!demand){
      logger.info("No scheduled demands.");
      return
    }
    console.log(demand)
    
    const users = await this.usersNearby.usersNearby(demand);

    if(!users || users.length === 0){
      logger.info("No users nearby.");
      return
    }
  
      for (const user of users){
         const emailQueue = new EmailQueue();
         emailQueue.date = demand.collectionDate;
         emailQueue.management = demand;
         emailQueue.user = user;
         await this.emailRepository.save(emailQueue)
         logger.info(`"User ${user.name} added to the queue.`);
      }
      demand.processed = true;

      await this.managementRepository.save(demand);
    }catch (error) {
      logger.error(error);
      
      throw new InternalServerErrorException("Error processing users." + error)
    }

   }

  private  async recentDemand(): Promise<Management>{
    return await this.managementRepository
      .createQueryBuilder('demand')
      .where('demand.processed = :processed', {processed: false})
      .orderBy('demand.createdAt', 'ASC')
      .getOne()
  }

  async imminentDemand(): Promise<EmailQueue[]> {
    const now = new Date();
    const twentyFourHoursLater = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const demandList = await this.emailRepository
      .createQueryBuilder('demand')
      .where('demand.processed = :processed', { processed: false })
      .andWhere('demand.date BETWEEN :now AND :twentyFourHoursLater', { now, twentyFourHoursLater })
      .orderBy('demand.createdAt', 'ASC') 
      .take(this.qtdEmails)
      .getMany(); 

    return demandList;
  }


}