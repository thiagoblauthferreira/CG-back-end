import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Products } from './entities/product.entity';
import { CreateProduct, UpdateProduct } from './dto';
import { ProductMessagesHelper } from './helpers/product.helper';
import { InjectRepository } from '@nestjs/typeorm';
import { DistribuitionPointsService } from '../distriuition-points/distribuition-point.service';
import { User } from '../auth/entities/auth.enity';
import { CreateUserDto } from '../auth/dto/auth.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(forwardRef(() => DistribuitionPointsService))
    private distribuitionPointService: DistribuitionPointsService,
  ) {}

  public async create(
    createProduct: CreateProduct,
    currentUser: CreateUserDto,
  ) {
    const user = await this.usersRepository.findOne({
      where: { id: currentUser.id },
    });

    const product = this.productsRepository.create(createProduct);

    if (createProduct.distribuitionPointId) {
      const distribuitionPoint = await this.distribuitionPointService.findOne(
        createProduct.distribuitionPointId,
      );

      product.distribuitionPoint = distribuitionPoint;
    }

    product.creator = user;

    await this.productsRepository.save(product);

    return product;
  }

  public async update(updateProduct: UpdateProduct, id: string) {
    const product = await this.findOne(id);

    const newProduct = {
      ...product,
      ...updateProduct,
    };

    const saveProduct = await this.productsRepository.save(newProduct);

    return saveProduct;
  }

  public async findOne(
    id: string,
    relations?: { distribuitionPoint?: boolean; creator?: boolean },
  ) {
    const products = await this.productsRepository.findOne({
      where: { id },
      relations,
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
        creator: true,
      },
      select: {
        distribuitionPoint: {
          id: true,
        },
        creator: {
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
