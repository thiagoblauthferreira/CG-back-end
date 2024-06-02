import { Module, forwardRef } from "@nestjs/common";
import PartnerController from "./partner.controller";
import { PartnerService } from "./partner.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Partner } from "./entities/partner.entity";
import { Address } from "../auth/entities/adress.enity";
import { AuthModule } from "../auth/auth.module";
import { FileEntity } from "./entities/file.entity";
import { FilesService } from "./utils/file.service";

@Module({
  imports: [TypeOrmModule.forFeature([Partner, Address, FileEntity]),
  forwardRef(() => AuthModule)],
  providers: [PartnerService, FilesService],
  controllers: [PartnerController]
})


export class PartnerModule{}