import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { ShelterService } from './shelter.service';
import { UpdateShelterDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Shelter')
@Controller('shelter')
export class ShelterController {
  constructor(private shelterService: ShelterService) {}

  @Post('/')
  async create(@Body() createShelter: CreateShelterDto) {
    return await this.shelterService.create(createShelter);
  }

  @Patch('/:shelterId')
  async update(
    @Param('shelterId') shelterId: string,
    @Body() updateShelter: UpdateShelterDto,
  ) {
    return await this.shelterService.update(updateShelter, shelterId);
  }

  @Get('/')
  async listAll() {
    return await this.shelterService.listAll();
  }

  @Get('/:shelterId')
  async finOne(@Param('shelterId') shelterId: string) {
    return await this.shelterService.findOne(shelterId);
  }

  @Delete('/:shelterId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('shelterId') shelterId: string) {
    return await this.shelterService.remove(shelterId);
  }

  @Patch('/:shelterId/coordinator/:coordinatorId')
  async addCoordinator(
    @Param('coordinatorId') coordinatorId: string,
    @Param('shelterId') shelterId: string,
  ) {
    return await this.shelterService.addCoordinator(shelterId, coordinatorId);
  }
}
