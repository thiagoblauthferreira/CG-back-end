import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Products } from './entities/product.entity';
import { CreateProduct, UpdateProduct } from './dto';
import { ProductMessagesHelper } from './helpers/product.helper';
import { InjectRepository } from '@nestjs/typeorm';
import { DistribuitionPointsService } from '../distriuition-points/distribuition-point.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    private distribuitionPointService: DistribuitionPointsService,
  ) {}

  public async create(createProduct: CreateProduct) {
    const product = this.productsRepository.create(createProduct);

    if (createProduct.distribuitionPointId) {
      const distribuitionPoint = await this.distribuitionPointService.findOne(
        createProduct.distribuitionPointId,
      );

      product.distribuitionPoint = distribuitionPoint;
    }

    await this.productsRepository.save(product);

    return product;
  }

  public async update(updateProduct: UpdateProduct, id: string) {
    const product = await this.findOne(id);

    const newProduct = {
      ...product,
      ...updateProduct,
    };

    if (updateProduct.distribuitionPointId) {
      const distribuitionPoint = await this.distribuitionPointService.findOne(
        updateProduct.distribuitionPointId,
      );

      newProduct.distribuitionPoint = distribuitionPoint;
    }

    await this.productsRepository.save(newProduct);

    return await this.findOne(id);
  }

  public async findOne(id: string) {
    const products = await this.productsRepository.findOne({
      where: { id },
      relations: {
        distribuitionPoint: true,
      },
      select: {
        distribuitionPoint: {
          id: true,
        },
      },
    });
    if (!products) {
      throw new NotFoundException(ProductMessagesHelper.PRODUCT_NOT_FOUND);
    }

    return products;
  }

  public async listAll() {
    return this.productsRepository.find({
      relations: {
        distribuitionPoint: true,
      },
      select: {
        distribuitionPoint: {
          id: true,
        },
      },
    });
  }

  public async delete(id: string) {
    await this.findOne(id);
    await this.productsRepository.delete(id);

    return {
      message: ProductMessagesHelper.PRODUCT_DELETED,
    };
  }
}
