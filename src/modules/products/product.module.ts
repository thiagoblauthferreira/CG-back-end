import { Module, forwardRef } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';
import { DistribuitionPointsModule } from '../distriuition-points/distribuition-point.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products]),
    forwardRef(() => DistribuitionPointsModule),
    forwardRef(() => AuthModule),
  ],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [TypeOrmModule, ProductService],
})
export class ProductsModule {}
