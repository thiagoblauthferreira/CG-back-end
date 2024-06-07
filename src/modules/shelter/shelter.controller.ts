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
import { ShelterCoordinatorDto } from './dto/coordinator.dto';

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
    return await this.shelterService.findOne(shelterId, {
      address: true,
      coordinators: true,
      creator: true,
    });
  }

  @Delete('/:shelterId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('shelterId') shelterId: string) {
    return await this.shelterService.remove(shelterId);
  }

  @Patch('/:shelterId/coordinator')
  async addOrRemoveCoordinator(
    @Param('shelterId') shelterId: string,
    @Body() coordinationAction: ShelterCoordinatorDto,
  ) {
    const { action, coordinatorId } = coordinationAction;
    if (action === 'add') {
      return await this.shelterService.addCoordinator(shelterId, coordinatorId);
    } else {
      return await this.shelterService.removeCoordinator(
        shelterId,
        coordinatorId,
      );
    }
  }
}
