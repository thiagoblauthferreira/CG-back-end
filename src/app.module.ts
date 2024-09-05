import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { dataSourceConfig } from './database/dataSource';
import { AuthModule } from './modules/auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NeedModule } from './modules/need/need.module';
import { ShelterModule } from './modules/shelter/shelter.module';
import { CompanyModule } from './modules/company/company.module';
import { DistribuitionPointsModule } from './modules/distriuition-points/distribuition-point.module';
import { ProductsModule } from './modules/products/product.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SearchModule } from './modules/search/search.module';
import { ManagementModule } from './modules/management/management.module';
import { Schedule } from './modules/schedule/schedule.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceConfig() as TypeOrmModuleOptions),
    AuthModule,
    CompanyModule,
    NeedModule,
    ShelterModule,
    DistribuitionPointsModule,
    ProductsModule,
    SearchModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src', 'assets'),
      serveRoot: '/assets',
    }),
    SearchModule,
    ManagementModule,
    Schedule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [TypeOrmModule],
})
export class AppModule {}
