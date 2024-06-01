import { Module, forwardRef } from "@nestjs/common";
import PartnerController from "./partner.controller";
import { PartnerService } from "./partner.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Partner } from "./entities/partner.entity";
import { Address } from "../auth/entities/adress.enity";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([Partner, Address]),
  forwardRef(() => AuthModule)],
  providers: [PartnerService],
  controllers: [PartnerController]
})


export class PartnerModule{}