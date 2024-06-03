import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { corsOptions } from './config/cors.options';
import * as fs from 'fs';
import * as https from 'https';
import * as http from 'http';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: corsOptions });

  const config = new DocumentBuilder()
    .setTitle('Coletivo Gloma - API')
    .setDescription('Coletivo Gloma')
    .setVersion('1.0')
    .addTag('tag')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const certPath = './certificados/certificado.crt';
  const keyPath = './certificados/chave-privada.pem';
  const cert = fs.readFileSync(certPath);
  const key = fs.readFileSync(keyPath);

  const httpsOptions = {
    cert: cert,
    key: key,
    passphrase: 'gloma'
  };
  const server = https.createServer(httpsOptions, app.getHttpAdapter().getInstance());
  server.listen(443);
  http.createServer((req, res) => {

    res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
    res.end();
  }).listen(80);
}
bootstrap();
