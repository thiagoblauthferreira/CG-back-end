import { MailerOptions } from '@nestjs-modules/mailer';
import * as AWS from 'aws-sdk';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import path from 'path';


AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const mailConfig: MailerOptions = {
  transport: {
    SES: new AWS.SES({
      apiVersion: '2010-12-01',
    }),
  },
  defaults: {
    from: 'ativacao@coletivogloma.com.br',
  },
  template: {
    dir: __dirname + '/templates',
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};
