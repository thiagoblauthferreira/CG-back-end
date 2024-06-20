import { Controller, Get, Post, Patch, Delete, Param, HttpStatus, HttpCode, UseGuards, Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ManagementService } from './management.service';
import { CreateManagementDTO } from './dto/request/createManagementDTO';
import { ResponseDefaultManagement } from './dto/response/responseDefaultManagement';

@ApiTags('Management')
@Controller('management')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ManagementController {
  constructor(
    private managementService: ManagementService
  ){}

  @Post('/create')
  async create(@Body() createManagementDTO: CreateManagementDTO) {
    return new ResponseDefaultManagement(await this.managementService.create(createManagementDTO));
  }

  @Patch('/:managementId')
  async update(@Param('managementId') managementId: string, updates: Partial<CreateManagementDTO>) {
    console.log(updates)
    return await this.managementService.update(managementId, updates);
  }

  @Get('/find-all')
  async listAll() {
    return (await this.managementService.findAll()).map((m) => new ResponseDefaultManagement(m));
  }
  @Get('/:managementId')
  async findOne(@Param('managementId') managementId: string) {
    return new ResponseDefaultManagement(await this.managementService.findById(managementId));
  }
 
  @Delete('/:managementId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('managementId') managementId: string) {
    return await this.managementService.delete(managementId);
  }

  @Patch('/:managementId/add-need/:needId')
  async addNeed(
   @Param('managementId') managementId: string,
   @Param('needId') needId: string ) {
    
    return await this.managementService.addNeed(managementId, needId);
  }

  @Delete('/:managementId/add-need/:needId')
  async removeNeed(
   @Param('managementId') managementId: string,
   @Param('needId') needId: string ) {
    
    return await this.managementService.removeNeed(managementId, needId);
  }

}