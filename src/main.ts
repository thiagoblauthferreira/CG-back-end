import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { corsOptions } from './config/cors.options';
import * as fs from 'fs';
import * as https from 'https';
import * as http from 'http';
import { appConfig } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: corsOptions });

  // Configurar Swagger
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

  // Configuração adicional da aplicação
  appConfig(app);

  // Configurações para HTTPS
  const certPath = './certificados/certificado.crt';
  const keyPath = './certificados/chave-privada.pem';
  let cert, key;
  try {
    cert = fs.readFileSync(certPath);
    key = fs.readFileSync(keyPath);
  } catch (error) {
    console.error('Erro ao ler os certificados:', error);
    return;
  }

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
  server.listen(443, () => {
    console.log('Servidor HTTPS rodando na porta 443');
  });

  // Redirecionar HTTP para HTTPS
  http
    .createServer((req, res) => {
      res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
      res.end();
    })
    .listen(80, () => {
      console.log('Servidor HTTP rodando na porta 80 e redirecionando para HTTPS');
    });

  // Ativar CORS
  app.enableCors(corsOptions);

  // Certifique-se de que a aplicação está ouvindo na porta correta
  await app.listen(3000, () => {
    console.log('Aplicação rodando na porta 3000');
  });

  // Logando todas as requisições
  app.use((req: { method: any; url: any; }, res: any, next: () => void) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });

  // Verificação adicional de rota
  app.use('/api', (req: any, res: { send: (arg0: string) => void; }) => {
    res.send('API está funcionando');
  });
}

bootstrap();
