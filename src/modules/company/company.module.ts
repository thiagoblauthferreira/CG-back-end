import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Address } from "../auth/entities/adress.enity";
import { AuthModule } from "../auth/auth.module";
import { FileEntity } from "./entities/file.entity";
import { FilesService } from "./utils/file.service";
import { Company } from "./entities/company.entity";
import { CompanyService } from "./company.service";
import CompanyController from "./company.controller";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([Company, Address, FileEntity]),
  JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '7d' }, 
  }),
  forwardRef(() => AuthModule)],
  providers: [CompanyService, FilesService],
  controllers: [CompanyController],
  exports: [CompanyService]
})

export class CompanyModule{}