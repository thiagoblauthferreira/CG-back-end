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
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProduct, UpdateProduct } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateUserDto } from '../auth/dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { SearchProduct } from './dto/search-product';

@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private productsService: ProductService) {}

  @Post('/')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('coordinator', 'user')
  async create(
    @CurrentUser() currentUser: CreateUserDto,
    @Body() createProduct: CreateProduct,
  ) {
    return await this.productsService.create(createProduct, currentUser);
  }

  @Patch('/:productId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('coordinator', 'user')
  async update(
    @Param('productId') productId: string,
    @Body() updateProduct: UpdateProduct,
  ) {
    return await this.productsService.update(updateProduct, productId);
  }

  @Get('/')
  async listAll(@Query() query: SearchProduct) {
    return await this.productsService.listAll(query, { creator: true });
  }

  @Get('/:productId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async finOne(@Param('productId') productId: string) {
    return await this.productsService.findOne(productId, {
      distribuitionPoint: true,
    });
  }

  @Delete('/:productId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('coordinator', 'user', 'admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('productId') productId: string) {
    return await this.productsService.delete(productId);
  }
}
