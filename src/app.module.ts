import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { dataSourceConfig } from './database/dataSource';
import { AuthModule } from './modules/auth/auth.module';
import { AppService } from './app.service';
import { ShelterModule } from './modules/shelter/shelter.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceConfig() as TypeOrmModuleOptions),
    AuthModule,
    ShelterModule,
  ],
  controllers: [],
  providers: [AppService],
  exports: [TypeOrmModule],
})
export class AppModule {}
