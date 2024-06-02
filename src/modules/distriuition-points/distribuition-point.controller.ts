import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DistribuitionPointsService } from './distribuition-point.service';
import { CreateDistribuitionPoin, UpdateDistribuitionPoin } from './dto';

@Controller('distribuitionPoint')
export class DistribuitionPointsController {
  constructor(private distribuitionPointService: DistribuitionPointsService) {}

  @Post('/')
  async create(@Body() createDistribuitionPoint: CreateDistribuitionPoin) {
    return await this.distribuitionPointService.create(
      createDistribuitionPoint,
    );
  }

  @Patch('/:distribuitionPointId')
  async update(
    @Param('distribuitionPointId') distribuitionPointId: string,
    @Body() updateDistribuitionPoin: UpdateDistribuitionPoin,
  ) {
    return await this.distribuitionPointService.update(
      updateDistribuitionPoin,
      distribuitionPointId,
    );
  }

  @Get('/')
  async listAll() {
    return await this.distribuitionPointService.listAll();
  }

  @Get('/:distribuitionPointId')
  async finOne(@Param('distribuitionPointId') distribuitionPointId: string) {
    return await this.distribuitionPointService.findOne(distribuitionPointId);
  }

  @Delete('/:distribuitionPointId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('distribuitionPointId') distribuitionPointId: string) {
    return await this.distribuitionPointService.remove(distribuitionPointId);
  }
}
