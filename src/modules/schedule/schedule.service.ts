import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import logger from "src/logger";
import { InjectRepository } from "@nestjs/typeorm";
import { Management } from "../management/entities/management.entity";
import { Repository } from "typeorm";
import { EmailQueue } from "./entity/emailQueue.entity";
import { UserNearby } from "./helpers/usersNearby";
import { MailService } from "../mail/mail.service";



@Injectable()
export class ScheduleService {
  private readonly qtdEmails = 200;
  constructor(
    @InjectRepository(Management)
    private managementRepository: Repository<Management>,
    @InjectRepository(EmailQueue)
    private emailRepository: Repository<EmailQueue>,
    private usersNearby: UserNearby,
    private mailService: MailService,
  ){}

  

  @Cron(CronExpression.EVERY_MINUTE)
  async sendEmailQueue() {
    try{
      logger.info(`Start sending ${this.qtdEmails} emails every hour.`)
      const emails: EmailQueue[] = await this.imminentDemand();

      if(!emails || emails.length === 0){
        logger.info("No emails to send.");
        return
      }

    for (const email of await emails){
      const userName = email.name;
      const userEmail = email.email;
      const collectionDate = email.management.collectionDate;
      const collectPoint = email.management.collectPoint;
     
      const localeDate = collectionDate.toLocaleString('pt-BR');

      await this.mailService.sendNearByUsers(userName, userEmail, localeDate, collectPoint)
      await console.log(`Send e-mail to ${userName}.`);
    
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
    
    const users = await this.usersNearby.usersNearby(demand);
  
    if(!users || users.length === 0){
      logger.info("No users nearby.");
      return
    }
  
    for (const user of users) {
      const emailQueue = this.emailRepository.create({
        date: demand.collectionDate,
        management: demand,
        name: user.name,
        email: user.email,
        processed: false
      });

      try {
        await this.emailRepository.save(emailQueue);
        logger.info(`User ${user.name} add in queue.`);
      } catch (saveError) {
       logger.info('Erro to save in queue:', saveError);
        throw new InternalServerErrorException('Erro to save in queue: ' + saveError);
      }
    }
      demand.processed = true;
      await this.managementRepository.save(demand)
    
    }catch (error) {
      logger.error(error);
      
      throw new InternalServerErrorException("Error processing users." + error)
    }

   }

  private  async recentDemand(): Promise<Management>{
    return await this.managementRepository
      .createQueryBuilder('demand')
      .leftJoinAndSelect('demand.collectPoint', 'collectPoint')
      .leftJoinAndSelect('demand.shelter', 'shelter')
      .where('demand.processed = :processed', {processed: false})
      .orderBy('demand.createdAt', 'ASC')
      .getOne()
  }

  async imminentDemand(): Promise<EmailQueue[]> {

    const demandList = await this.emailRepository
    .createQueryBuilder('demand')
    .leftJoinAndSelect('demand.management', 'management')
    .andWhere('demand.processed = :processed', { processed: false })
    .orderBy('demand.createdAt', 'ASC') 
    .take(this.qtdEmails)
    .getMany();

  return demandList;
  }


}

function sendNearByUsers() {
  throw new Error("Function not implemented.");
}
