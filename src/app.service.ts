import { Injectable, Logger } from '@nestjs/common';
import logger from './logger';
@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
      this.logger.log('Hello world log');
      logger.info('Hello world log with winston');
      return 'Hello World With Logs!';
  }
}
