import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation() {
    const logoPath = path.join(__dirname, '../mail/templates/images/logo.png');
    const logoContent = fs.readFileSync(logoPath);
    await this.mailerService.sendMail({
      to: 'vinigpo@gmail.com',
      subject: 'Ativação de cadastro Coletivo Gloma',
      template: './confirmation', // Nome do template
      context: {  // Dados para o template
        activationCode: '123456',
        activationLink: 'http://localhost:3000/activate/123456',
      },
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
