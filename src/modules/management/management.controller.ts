import { Get, Post, Patch, Delete, Param, HttpStatus, HttpCode, UseGuards, Body, Controller } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateManagementDTO } from './dto/request/createManagementDTO';
import { ManagementService } from './management.service';
import { ResponseDefaultManagement } from './dto/response/responseDefaultManagement';
import { DeleteManagementDto } from './dto/request/deleteManagementDto';
import { UpdateManagementDTO } from './dto/request/updateManagementDTO';


@ApiTags('Management')
@Controller('management')
export class ManagementController {
  constructor(
    private managementService: ManagementService
  ){}

  @Post('/create')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createManagementDTO: CreateManagementDTO) {
    return new ResponseDefaultManagement(await this.managementService.create(createManagementDTO));
  }

  @Patch('/:managementId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('managementId') managementId: string,@Body() updates: UpdateManagementDTO) {
     return new ResponseDefaultManagement(await this.managementService.update(managementId, updates));
  }

  @Get('/find-all')
  async listAll() {
    return (await this.managementService.findAll()).map((m) => new ResponseDefaultManagement(m));
  }

  @Get('/find-all-by-user/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async listAllByUser(@Param('id') id: string) {
    const managements = await this.managementService.findAllByUser(id)
    return managements.map((m) => new ResponseDefaultManagement(m));
  }

  @Get('/:managementId')
  async findOne(@Param('managementId') managementId: string) {
    return new ResponseDefaultManagement(await this.managementService.findById(managementId));
  }


  @Delete('/:managementId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('managementId') managementId: string, @Body() userId: DeleteManagementDto) {
    return await this.managementService.delete(managementId, userId.userId);
  }

  @Patch('/:managementId/add-need/:needId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async addNeed(
   @Param('managementId') managementId: string,
   @Param('needId') needId: string ) {
    
    return await this.managementService.addNeed(managementId, needId);
  }

  @Delete('/:managementId/add-need/:needId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async removeNeed(
   @Param('managementId') managementId: string,
   @Param('needId') needId: string ) {
   return await this.managementService.removeNeed(managementId, needId);
  }
}