import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shelter } from './entities/shelter.entity';
import { ShelterMessagesHelper } from './helpers/shelter.helper';
import { UpdateShelterDto, CreateShelterDto } from './dto';
import { User } from '../auth/entities/auth.enity';
import { Address } from '../auth/entities/adress.enity';

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

  async create(createShelter: CreateShelterDto, currentUser: any) {
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

  async findOne(shelterId: string, relations?: IRelations) {
    const shelter = await this.shelterRepository.findOne({
      where: { id: shelterId },
      relations,
      select: {
        coordinators: {
          id: true,
        },
      },
    });
    if (!shelter) {
      throw new NotFoundException(ShelterMessagesHelper.SHELTER_NOT_FOUND);
    }

    return shelter;
  }

  async listAll() {
    return await this.shelterRepository.find({
      relations: { address: true, creator: true, coordinators: true },
      select: {
        coordinators: {
          id: true,
        },
      },
    });
  }

  async remove(shelterId: string) {
    const shelter = await this.findOne(shelterId);
    shelter.deletedAt = new Date();

    await this.shelterRepository.save(shelter);

    return { message: ShelterMessagesHelper.SHELTER_DELETED };
  }

  async addCoordinator(shelterId: string, coordinatorId: string) {
    const shelter = await this.findOne(shelterId);

    const coordinator = await this.usersRepository.findOne({
      where: { id: coordinatorId },
    });
    if (!coordinator) {
      throw new NotFoundException(ShelterMessagesHelper.USER_NOT_FOUND);
    }
    if (coordinator.roles.includes('donor')) { // Changes for user roles
      throw new ForbiddenException(
        ShelterMessagesHelper.THIS_USER_NOT_COORDINATOR,
      );
    }
    const coordinatorExistsInShelter = shelter.coordinators.find(
      (shelterCoordinator) => shelterCoordinator.id === coordinatorId,
    );
    if (coordinatorExistsInShelter) {
      throw new NotFoundException(
        ShelterMessagesHelper.SHELTER_COORDINATOR_ALREADY_ASSOCIATED,
      );
    }

    shelter.coordinators.push(coordinator);

    await this.shelterRepository.save(shelter);

    return { message: ShelterMessagesHelper.COORDINATOR_ADDED_SHELTER };
  }

  async removeCoordinator(shelterId: string, coordinatorId: string) {
    const shelter = await this.findOne(shelterId);

    const coordinator = await this.usersRepository.findOne({
      where: { id: coordinatorId },
    });
    if (!coordinator) {
      throw new NotFoundException(ShelterMessagesHelper.USER_NOT_FOUND);
    }
    const coordinatorExistsInShelter = shelter.coordinators.find(
      (shelterCoordinator) => shelterCoordinator.id === coordinatorId,
    );
    if (!coordinatorExistsInShelter) {
      throw new NotFoundException(ShelterMessagesHelper.USER_NOT_FOUND);
    }

    shelter.coordinators = shelter.coordinators.filter(
      (coordinatorFilter) => coordinator.id !== coordinatorFilter.id,
    );

    await this.shelterRepository.save(shelter);

    return { message: ShelterMessagesHelper.COORDINATOR_REMOVED_SHELTER };
  }
}
