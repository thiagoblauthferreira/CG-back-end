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
import { ProductDto } from './dto/product.dto';

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
  async findOne(@Param('distribuitionPointId') distribuitionPointId: string) {
    return await this.distribuitionPointService.findOne(distribuitionPointId, {
      address: true,
      products: true,
    });
  }

  @Delete('/:distribuitionPointId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('distribuitionPointId') distribuitionPointId: string) {
    return await this.distribuitionPointService.remove(distribuitionPointId);
  }

  @Get('/:distribuitionPointId/products')
  async listProducts(
    @Param('distribuitionPointId') distribuitionPointId: string,
  ) {
    return await this.distribuitionPointService.listProducts(
      distribuitionPointId,
    );
  }

  @Patch('/:distribuitionPointId/products')
  async addOrRemoveProduct(
    @Param('distribuitionPointId') distribuitionPointId: string,
    @Body() distribuitionPointAction: ProductDto,
  ) {
    const { action, productId } = distribuitionPointAction;
    if (action === 'add') {
      return await this.distribuitionPointService.addProduct(
        distribuitionPointId,
        productId,
      );
    } else {
      return await this.distribuitionPointService.removeProduct(
        distribuitionPointId,
        productId,
      );
    }
  }
}
