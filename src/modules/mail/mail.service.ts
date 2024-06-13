import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as AWS from 'aws-sdk';
import * as Handlebars from 'handlebars';
import { SendMailActivationUserDto } from './dto/sendmailactivationuser.dto';

@Injectable()
export class MailService {
  private s3: AWS.S3;

  constructor(private readonly mailerService: MailerService) {
    this.s3 = new AWS.S3();
  }

  private async getS3File(bucket: string, key: string): Promise<Buffer> {
    const params = { Bucket: bucket, Key: key };
    const data = await this.s3.getObject(params).promise();
    return data.Body as Buffer;
  }

  private compileTemplate(templateContent: string, context: any): string {
    const template = Handlebars.compile(templateContent);
    return template(context);
  }

  async sendUserConfirmation(activationDto: SendMailActivationUserDto) {
    const logoContent = await this.getS3File('templates-mail-gloma', 'images/logo.png');
    const templateContent = (await this.getS3File('templates-mail-gloma', 'templates/mail-confirmation.hbs')).toString('utf-8');

    const compiledTemplate = this.compileTemplate(templateContent, {
      activationCode: activationDto.code,
      activationLink: 'http://localhost:3000/' + activationDto.code + '/activate',
      nome: activationDto.name.split(' ')[0],
    });

    await this.mailerService.sendMail({
      to: 'mock-activation@coletivogloma.com.br', // Após liberado acesso a produção SES - activationDto.mail,
      subject: 'Ativação de cadastro Coletivo Gloma',
      html: compiledTemplate,
      attachments: [
        {
          filename: 'logo.png',
          content: logoContent,
          cid: 'logo@coletivogloma',
        },
      ],
    });
  }
}
