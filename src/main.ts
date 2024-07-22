import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { corsOptions } from './config/cors.options';
import * as fs from 'fs';
import * as https from 'https';
import * as http from 'http';
import { appConfig } from './config/app.config';
import { EnvConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: corsOptions });
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Coletivo Gloma - API')
    .setDescription('Coletivo Gloma')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .addTag('Auth')
    .addTag('Shelter')
    .addTag('Hello World')
    .addTag('Distribution points')
    .addTag('Products')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/document', app, document);
  appConfig(app);
  if (EnvConfig.ENV !== "production") {

    await app.listen(8080);
  } else {
    // Configurações para HTTPS
    const certPath = './certificados/certificado.crt';
    const keyPath = './certificados/chave-privada.pem';
    const cert = fs.readFileSync(certPath);
    const key = fs.readFileSync(keyPath);

    const httpsOptions = {
      cert: cert,
      key: key,
      passphrase: 'gloma',
    };

    // Criar servidor HTTPS
    const server = https.createServer(
      httpsOptions,
      app.getHttpAdapter().getInstance(),
    );
    server.listen(443);

    // Redirecionar HTTP para HTTPS
    http
      .createServer((req, res) => {
        res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
        res.end();
        
      })
      .listen(80);
      app.enableCors(corsOptions);
  }
}

bootstrap();
