
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { mailConfig } from './mail.config';
import { MailService } from './mail.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRoot(mailConfig),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
