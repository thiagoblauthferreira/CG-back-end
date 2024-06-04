import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CreatePartnerDTO } from "./dto/request/CreatePartnerDTO";
import { PartnerService } from "./partner.service";
import { UpdatePartnerResponserDTO } from "./dto/response/UpdatePartnerResponseDTO ";
import { FileInterceptor } from "@nestjs/platform-express";
import multerConfig from "./utils/multer.config";
import { DefaultPartnerResponserDTO } from "./dto/response/DefaultPartnerResponseDTO";
import { Partner } from "./entities/partner.entity";

@Controller('partner')
export default class PartnerController {

  constructor(
    private partnerService: PartnerService
  ){}

  @Post('register')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async register(@UploadedFile() file: Express.MulterS3.File, @Body() createPartnerDTO: CreatePartnerDTO) {
    return new DefaultPartnerResponserDTO(await this.partnerService.create(createPartnerDTO, file));
  }
  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    return new DefaultPartnerResponserDTO(await this.partnerService.authenticate(email, password));
  }

  @Put('update/:id')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async update(@Param('id') id: string, @Body() updates: Partial<Partner>,@UploadedFile() file?: Express.MulterS3.File,) {
  return new UpdatePartnerResponserDTO(await this.partnerService.update(id, updates, file))
  }

  @Get('find-all')
  async findAll(){
    return  (await this.partnerService.findAll()).map( p => new UpdatePartnerResponserDTO(p))
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
  return await this.partnerService.findById(id);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.partnerService.delete(id);
  }

  @Get('nearby-partner/:partnerId')
  async findNearbyUsers(@Param('partnerId') partnerId: string) {
    const nearbyUsers = await this.partnerService.findNearbyPartner(partnerId, 20);
    return nearbyUsers;
  }


}