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

@Controller('shelter')
export class ShelterController {
  constructor(private shelterService: ShelterService) {}

  @Post('/')
  async create(@Body() createShelter: CreateShelterDto) {
    return await this.shelterService.create(createShelter);
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateShelter: UpdateShelterDto,
  ) {
    return await this.shelterService.update(updateShelter, id);
  }

  @Get('/')
  async listAll() {
    return await this.shelterService.listAll();
  }

  @Get('/:id')
  async finOne(@Param('id') id: string) {
    return await this.shelterService.findOne(id);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return await this.shelterService.remove(id);
  }
}
