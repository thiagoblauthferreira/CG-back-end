import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as AWS from 'aws-sdk';
import * as Handlebars from 'handlebars';
import { SendMailActivationUserDto } from './dto/sendmailactivationuser.dto';
import { SendMailResetPasswordDto } from './dto/sendmailresetpassword.dto';
import { Address } from '../auth/entities/adress.enity';

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
    const logoContent = await this.getS3File(
      'templates-mail-gloma',
      'images/logo.png',
    );
    const templateContent = (
      await this.getS3File(
        'templates-mail-gloma',
        'templates/mail-confirmation.hbs',
      )
    ).toString('utf-8');

    const compiledTemplate = this.compileTemplate(templateContent, {
      activationCode: activationDto.code,
      activationLink:
        'http://localhost:3000/' + activationDto.code + '/activate',
      nome: activationDto.name.split(' ')[0],
    });

    await this.mailerService.sendMail({
      to: activationDto.mail,
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

  async sendResetPassword(resetPassword: SendMailResetPasswordDto) {
    const logoContent = await this.getS3File(
      'templates-mail-gloma',
      'images/logo.png',
    );
    const templateContent = (
      await this.getS3File(
        'templates-mail-gloma',
        'templates/resetpassword.hbs',
      )
    ).toString('utf-8');

    const compiledTemplate = this.compileTemplate(templateContent, {
      password: resetPassword.password,
      nome: resetPassword.name.split(' ')[0],
    });

    await this.mailerService.sendMail({
      to: resetPassword.mail,
      subject: 'Senha resetada Coletivo Gloma',
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

  async sendChangePasswordAlert(email: string, nome: string) {
    const logoContent = await this.getS3File(
      'templates-mail-gloma',
      'images/logo.png',
    );
    const templateContent = (
      await this.getS3File(
        'templates-mail-gloma',
        'templates/change-password.hbs',
      )
    ).toString('utf-8');
    //aqui eu vou ter que alterar para receber os dados.
    const compiledTemplate = this.compileTemplate(templateContent, {
      nome: nome.split(' ')[0],
    });

    await this.mailerService.sendMail({
      to: email,
      subject: 'Alteração de senha Coletivo Gloma',
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

  //email para notificar usuários próximos
  async sendNearByUsers(
    name: string,
    email: string,
    collectionDate: string,
    collectionPoint: Address,
  ) {
    const logoContent = await this.getS3File(
      'templates-mail-gloma',
      'images/logo.png',
    );
    const templateContent = (
      await this.getS3File('templates-mail-gloma', 'templates/users-nearby.hbs')
    ).toString('utf-8');

    const compiledTemplate = this.compileTemplate(templateContent, {
      shelterName: name,
      date: collectionDate,
      street: collectionPoint.logradouro,
      number: collectionPoint.numero,
      neighborhood: collectionPoint.bairro,
      city: collectionPoint.municipio,
      state: collectionPoint.estado,
      complement: collectionPoint.complemento,
      cep: collectionPoint.cep,
    });

    await this.mailerService.sendMail({
      to: email,
      subject: 'Novo ponto de coleta próximo.',
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
