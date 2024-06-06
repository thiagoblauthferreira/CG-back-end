import { Body, Controller, Delete, Get, Request, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors, HttpStatus } from "@nestjs/common";
import { CreateCompanyDTO } from "./dto/request/CreateCompanyDTO";
import { CompanyService } from "./company.service";
import { FileInterceptor } from "@nestjs/platform-express";
import multerConfig from "./utils/multer.config";
import { ApiTags } from '@nestjs/swagger';
import { Company } from "./entities/company.entity";
import { UpdateCompanyResponserDTO } from "./dto/response/UpdateCompanyResponseDTO ";
import { AuthGuard } from "@nestjs/passport";
import { DefaultCompanyResponserDTO } from "./dto/response/DefaultCompanyDTO";

@ApiTags("Company")
@Controller('company')
export default class CompanyController {

  constructor(
    private companyService: CompanyService
  ){}

  @Post('register')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async register(@UploadedFile() file: Express.MulterS3.File, @Body() createCompanyDTO: CreateCompanyDTO) {
     return await this.companyService.create(createCompanyDTO, file);
  }

  @Put('update/:id')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async update(@Param('id') id: string, @Body() updates: Partial<Company>,@UploadedFile() file?: Express.MulterS3.File,) {
  return new UpdateCompanyResponserDTO(await this.companyService.update(id, updates, file))
  }

  @Get('find-all')
  async findAll(){
    return  (await this.companyService.findAll()).map( p => new UpdateCompanyResponserDTO(p))
  }

  @Get('/profile')
  @UseGuards(AuthGuard('jwt'))
  async findById(@Request() req) {
    console.log(req)
   const company = await this.companyService.profile(req.user.sub);
   return  { status: HttpStatus.OK, data: new DefaultCompanyResponserDTO(company) };
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.companyService.delete(id);
  }

  @Get('nearby-company/:companyId')
  async findNearbyUsers(@Param('companyId') companyId: string) {
    const nearbyCompany = await this.companyService.findNearbyCompany(companyId, 20);
    return nearbyCompany;
  }


}