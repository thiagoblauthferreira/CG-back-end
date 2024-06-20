import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { corsOptions } from './config/cors.options';
import { appConfig } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: corsOptions });

  const config = new DocumentBuilder()
    .setTitle('Coletivo Gloma - API')
    .setDescription('Coletivo Gloma')
    .setVersion('1.0')
    .addBearerAuth({ type: "http", scheme: "bearer", bearerFormat: "JWT" })
    .addTag('Auth')
    .addTag('Shelter')
    .addTag('Need-items')
    .addTag('Need-volunteer')
    .addTag('Management')
    .addTag('Hello World')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  appConfig(app);

  await app.listen(3000);

 /* if(EnvConfig.ENV !== "production") return app.listen(8080);

  const certPath = './certificados/certificado.crt';
  const keyPath = './certificados/chave-privada.pem';
  const cert = fs.readFileSync(certPath);
  const key = fs.readFileSync(keyPath);

  const httpsOptions = {
    cert: cert,
    key: key,
    passphrase: 'gloma'
  };

  await app.init();

  const httpsServer = https.createServer(httpsOptions, app.getHttpAdapter().getInstance());
  httpsServer.listen(443);

  http.createServer((req, res) => {
    res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
    res.end();
  }).listen(80);
}*/
}
bootstrap();
