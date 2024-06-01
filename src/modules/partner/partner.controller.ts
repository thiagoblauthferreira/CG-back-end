import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreatePartnerDTO } from "./dto/request/CreatePartnerDTO";
import { PartnerService } from "./partner.service";
import { CreatePartnerResponserDTO } from "./dto/response/CreatePartnerResponseDTO";
import { Partner } from "./entities/partner.entity";

@Controller('partner')
export default class PartnerController {

  constructor(
    private partnerService: PartnerService
  ){}

  @Post('register')
  async register(@Body() createPartnerDTO: CreatePartnerDTO) {
  return new CreatePartnerResponserDTO(await this.partnerService.create(createPartnerDTO))
  }

  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updates: Partial<Partner>) {
  return await this.partnerService.update(id, updates)
  }

  @Get('find-all')
  async findAll(){
    return await this.partnerService.findAll()
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
  return await this.partnerService.findById(id);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.partnerService.delete(id);
  }


}