import { Module } from "@nestjs/common";
import PartnerController from "./partner.controller";
import { PartnerService } from "./partner.service";

@Module({
  imports: [],
  providers: [PartnerService],
  controllers: [PartnerController]
})


export class PartnerModule{}