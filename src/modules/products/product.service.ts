import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import {
  Brackets,
  FindManyOptions,
  FindOptionsWhere,
  Like,
  Repository,
} from 'typeorm';
import { Products } from './entities/product.entity';
import { CreateProduct, UpdateProduct } from './dto';
import { ProductMessagesHelper } from './helpers/product.helper';
import { InjectRepository } from '@nestjs/typeorm';
import { DistribuitionPointsService } from '../distriuition-points/distribuition-point.service';
import { User } from '../auth/entities/auth.enity';
import { CreateUserDto } from '../auth/dto/auth.dto';
import { SearchProduct } from './dto/search-product';
import { Paginate } from 'src/common/interface';
import { ProducatType } from './enums/products.enum';

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

  public async listAll(
    query: SearchProduct,
    relations?: { distribuitionPoint?: boolean; creator?: boolean },
  ): Promise<Paginate<Products>> {
    const distribuitionPointId = query.distribuitionPointId;

    const queryBuilder = this.productsRepository.createQueryBuilder('product');

    if (relations?.distribuitionPoint) {
      queryBuilder
        .leftJoinAndSelect('product.distribuitionPoint', 'distribuitionPoint')
        .addSelect(['distribuitionPoint.id']);
    }
    if (relations?.creator) {
      queryBuilder
        .leftJoinAndSelect('product.creator', 'creator')
        .addSelect(['creator.id']);
    }

    if (query.search) {
      const formattedSearch = `%${query.search.toLowerCase().trim()}%`;
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('LOWER(product.name) LIKE :search', {
            search: formattedSearch,
          }).orWhere('LOWER(product.description) LIKE :search', {
            search: formattedSearch,
          });
        }),
      );
    }
    if (query.type) {
      queryBuilder.andWhere('product.type = :type', { type: query.type });
    }
    if (distribuitionPointId) {
      await this.distribuitionPointService.findOne(distribuitionPointId);
      queryBuilder.andWhere(
        'product.distribuitionPointId = :distribuitionPointId',
        { distribuitionPointId },
      );
    }

    const limit = parseInt(query.limit as string, 10) || 10;
    const offset = parseInt(query.offset as string, 10) || 0;

    queryBuilder.skip(offset).take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      total,
    };
  }

  public async delete(id: string) {
    await this.findOne(id);
    await this.productsRepository.delete(id);

    return {
      message: ProductMessagesHelper.PRODUCT_DELETED,
    };
  }
}
