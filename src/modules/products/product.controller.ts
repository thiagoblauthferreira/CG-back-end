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
import { ProductService } from './product.service';
import { CreateProduct, UpdateProduct } from './dto';

@Controller('product')
export class ProductController {
  constructor(private productsService: ProductService) {}

  @Post('/')
  async create(@Body() createProduct: CreateProduct) {
    return await this.productsService.create(createProduct);
  }

  @Patch('/:productId')
  async update(
    @Param('productId') productId: string,
    @Body() updateProduct: UpdateProduct,
  ) {
    return await this.productsService.update(updateProduct, productId);
  }

  @Get('/')
  async listAll() {
    return await this.productsService.listAll();
  }

  @Get('/:productId')
  async finOne(@Param('productId') productId: string) {
    return await this.productsService.findOne(productId);
  }

  @Delete('/:productId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('productId') productId: string) {
    return await this.productsService.delete(productId);
  }
}
