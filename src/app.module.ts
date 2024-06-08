import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { dataSourceConfig } from './database/dataSource';
import { AuthModule } from './modules/auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NeedModule } from './modules/need/need.module';


import { ShelterModule } from './modules/shelter/shelter.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceConfig() as TypeOrmModuleOptions),
    AuthModule,
    NeedModule,
    ShelterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [TypeOrmModule],
})
export class AppModule {}
