import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DistribuitionPoints } from './entities/distribuition-point.entity';
import { Repository } from 'typeorm';
import { CreateDistribuitionPoin, UpdateDistribuitionPoin } from './dto';
import { DistribuitionPointMessagesHelper } from './helpers/distribuition-point.helper';
import { User } from '../auth/entities/auth.enity';
import { Address } from '../auth/entities/adress.enity';

@Injectable()
export class DistribuitionPointsService {
  constructor(
    @InjectRepository(DistribuitionPoints)
    private distribuitionPointsRepository: Repository<DistribuitionPoints>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  public async create(createDistribuitionPoin: CreateDistribuitionPoin) {
    const user = await this.usersRepository.findOne({
      where: { id: createDistribuitionPoin.creatorId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const distibuitionPoint = this.distribuitionPointsRepository.create(
      createDistribuitionPoin,
    );

    const address = new Address();
    Object.assign(address, createDistribuitionPoin.address);
    const saveAddress = await this.addressRepository.save(address);

    distibuitionPoint.address = saveAddress;
    distibuitionPoint.creator = user;

    await this.distribuitionPointsRepository.save(distibuitionPoint);

    return distibuitionPoint;
  }

  public async update(update: UpdateDistribuitionPoin, id: string) {
    await this.findOne(id);

    await this.distribuitionPointsRepository.save(update);

    return await this.findOne(id);
  }

  public async listAll() {
    return this.distribuitionPointsRepository.find({
      relations: {
        address: true,
        products: true,
      },
    });
  }

  public async findOne(id: string) {
    const distribuitionPoint = await this.distribuitionPointsRepository.findOne(
      {
        where: { id },
        relations: {
          address: true,
          products: true,
        },
      },
    );

    if (!distribuitionPoint) {
      throw new NotFoundException(
        DistribuitionPointMessagesHelper.DISTRIBUITION_POINT_NOT_FOUND,
      );
    }

    return distribuitionPoint;
  }

  public async remove(id: string) {
    const distribuitionPoint = await this.findOne(id);
    distribuitionPoint.deletedAt = new Date();

    await this.distribuitionPointsRepository.save(distribuitionPoint);

    return {
      message: DistribuitionPointMessagesHelper.DISTRIBUITION_POINT_DELETED,
    };
  }
}
