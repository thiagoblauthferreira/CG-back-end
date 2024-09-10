import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { Shelter } from './entities/shelter.entity';
import { ShelterMessagesHelper } from './helpers/shelter.helper';
import { UpdateShelterDto, CreateShelterDto } from './dto';
import { User } from '../auth/entities/auth.enity';
import { Address } from '../auth/entities/adress.enity';
import { SearchShelter } from './dto/search-shelter';
import { Paginate } from 'src/common/interface';
import { SearchCoordinatorDto } from './dto/coordinator.dto';
import { CreateUserDto } from '../auth/dto/auth.dto';

interface IRelations {
  address?: boolean;
  creator?: boolean;
  coordinators?: boolean;
}
@Injectable()
export class ShelterService {
  constructor(
    @InjectRepository(Shelter)
    private shelterRepository: Repository<Shelter>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async create(createShelter: CreateShelterDto, currentUser: CreateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { id: currentUser.id },
    });

    const shelter = this.shelterRepository.create(createShelter);

    const address = new Address();
    Object.assign(address, createShelter.address);
    const saveAddress = await this.addressRepository.save(address);

    shelter.creator = user;
    shelter.coordinators = [user];
    shelter.address = saveAddress;

    await this.shelterRepository.save(shelter);

    return shelter;
  }

  async update(updateShelter: UpdateShelterDto, shelterId: string) {
    const shelter = await this.findOne(shelterId, { address: true });

    const newShelter = {
      ...shelter,
      ...updateShelter,
      address: {
        ...shelter.address,
        ...updateShelter.address,
      },
    };

    if (updateShelter.address) {
      const saveAddress = await this.addressRepository.save(newShelter.address);
      newShelter.address = saveAddress;
    }

    const saveShelter = await this.shelterRepository.save(newShelter);

    return saveShelter;
  }

  async findOne(
    shelterId: string,
    relations?: IRelations,
    currentUser?: CreateUserDto,
  ) {
    const queryBuilder = this.shelterRepository.createQueryBuilder('shelter');

    if (relations) {
      if (relations.address) {
        queryBuilder.leftJoinAndSelect('shelter.address', 'address');
      }
      if (relations.creator) {
        queryBuilder.leftJoinAndSelect('shelter.creator', 'creator');
      }
      if (relations.coordinators) {
        queryBuilder.leftJoinAndSelect('shelter.coordinators', 'coordinators');
      }
    }

    queryBuilder.where('shelter.id = :shelterId', { shelterId });

    const shelter = await queryBuilder.getOne();

    if (!shelter) {
      throw new NotFoundException(ShelterMessagesHelper.SHELTER_NOT_FOUND);
    }

    let isSubscribe = false;
    if (currentUser) {
      const userId = currentUser.id;

      const isCoordinatorQuery = this.shelterRepository
        .createQueryBuilder('shelter')
        .leftJoin('shelter.coordinators', 'coordinator')
        .where('shelter.id = :shelterId', { shelterId })
        .andWhere('coordinator.id = :userId', { userId })
        .getCount();
      isSubscribe = (await isCoordinatorQuery) > 0;
    }

    return { ...shelter, isSubscribe };
  }

  async listCoordinators(
    shelterId: string,
    query: SearchCoordinatorDto,
  ): Promise<Paginate<User>> {
    const queryBuilder = this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.shelters', 'shelter')
      .where('shelter.id = :shelterId', { shelterId });

    if (query.search) {
      const formattedSearch = `%${query.search.toLowerCase().trim()}%`;
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('LOWER(user.name) LIKE :search', {
            search: formattedSearch,
          })
            .orWhere('LOWER(user.email) LIKE :search', {
              search: formattedSearch,
            })
            .orWhere('LOWER(user.phone) LIKE :search', {
              search: formattedSearch,
            });
        }),
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

  public async listAll(query: SearchShelter): Promise<Paginate<Shelter>> {
    const queryBuilder = this.shelterRepository
      .createQueryBuilder('shelter')
      .leftJoinAndSelect('shelter.address', 'address');

    if (query.search) {
      const formattedSearch = `%${query.search.toLowerCase().trim()}%`;
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('LOWER(shelter.name) LIKE :search', {
            search: formattedSearch,
          })
            .orWhere('LOWER(shelter.description) LIKE :search', {
              search: formattedSearch,
            })
            .orWhere('LOWER(shelter.phone) LIKE :search', {
              search: formattedSearch,
            });
        }),
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

  async remove(shelterId: string) {
    const shelter = await this.findOne(shelterId);
    shelter.deletedAt = new Date();

    await this.shelterRepository.save(shelter);

    return { message: ShelterMessagesHelper.SHELTER_DELETED };
  }

  async addCoordinator(shelterId: string, coordinatorId: string) {
    const shelter = await this.findOne(shelterId, { coordinators: true });

    const coordinator = await this.usersRepository.findOne({
      where: { id: coordinatorId },
    });
    if (!coordinator) {
      throw new NotFoundException(ShelterMessagesHelper.USER_NOT_FOUND);
    }

    const isCoordinatorAlreadyAdded = shelter.coordinators.some(
      (existingCoordinator) => existingCoordinator.id === coordinatorId,
    );
    if (isCoordinatorAlreadyAdded) {
      throw new NotFoundException(
        ShelterMessagesHelper.SHELTER_COORDINATOR_ALREADY_ASSOCIATED,
      );
    }

    shelter.coordinators.push(coordinator);

    await this.shelterRepository.save(shelter);

    return { message: ShelterMessagesHelper.COORDINATOR_ADDED_SHELTER };
  }

  async removeCoordinator(shelterId: string, coordinatorId: string) {
    const shelter = await this.findOne(shelterId, { coordinators: true });

    const coordinator = await this.usersRepository.findOne({
      where: { id: coordinatorId },
    });
    if (!coordinator) {
      throw new NotFoundException(ShelterMessagesHelper.USER_NOT_FOUND);
    }

    const isCoordinatorAlreadyAdded = shelter.coordinators.some(
      (existingCoordinator) => existingCoordinator.id === coordinatorId,
    );
    if (!isCoordinatorAlreadyAdded) {
      throw new NotFoundException(ShelterMessagesHelper.USER_NOT_FOUND);
    }

    shelter.coordinators = shelter.coordinators.filter(
      (coordinatorFilter) => coordinator.id !== coordinatorFilter.id,
    );

    await this.shelterRepository.save(shelter);

    return { message: ShelterMessagesHelper.COORDINATOR_REMOVED_SHELTER };
  }
}
