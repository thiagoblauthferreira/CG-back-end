import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { dataSourceConfig } from './database/dataSource';
import { AuthModule } from './modules/auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShelterModule } from './modules/shelter/shelter.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ManagementModule } from './modules/management/management.module';
import { NeedModule } from './modules/need/need.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceConfig() as TypeOrmModuleOptions),
    AuthModule,
    ShelterModule,
    ManagementModule,
    NeedModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src', 'assets'),
      serveRoot: '/assets',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [TypeOrmModule],
})
export class AppModule {}
