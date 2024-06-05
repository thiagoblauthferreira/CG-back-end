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

  async create(createShelter: CreateShelterDto) {
    const user = await this.usersRepository.findOne({
      where: { id: createShelter.userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.roles.includes('donor')) {
      throw new ForbiddenException(
        ShelterMessagesHelper.SHELTER_ONLY_COORDINATORS_CAN_CREATE_A_SHELTER,
      );
    }

    const shelter = this.shelterRepository.create(createShelter);

    const address = new Address();
    Object.assign(address, createShelter.address);
    const saveAddress = await this.addressRepository.save(address);

    shelter.address = saveAddress;
    shelter.user = user;

    await this.shelterRepository.save(shelter);

    return shelter;
  }

  async update(updateShelter: UpdateShelterDto, shelterId: string) {
    await this.findOne(shelterId);

    await this.shelterRepository.save(updateShelter);

    return await this.findOne(shelterId);
  }

  async findOne(shelterId: string) {
    const shelter = await this.shelterRepository.findOne({
      where: { id: shelterId },
      relations: { address: true, coordinators: true },
    });

    if (!shelter) {
      throw new NotFoundException(ShelterMessagesHelper.SHELTER_NOT_FOUND);
    }

    return shelter;
  }

  async listAll() {
    return await this.shelterRepository.find({
      relations: { coordinators: true, address: true },
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

    const user = await this.usersRepository.findOne({
      where: { id: coordinatorId },
    });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const existingCoordinator = shelter.coordinators.find(
      (coordinator) => coordinator.id === coordinatorId,
    );
    if (existingCoordinator) {
      throw new ForbiddenException(
        ShelterMessagesHelper.SHELTER_COORDINATOR_IS_ALREADY_ASSOCIATED,
      );
    }

    shelter.coordinators = [existingCoordinator];

    await this.shelterRepository.save(shelter);

    return shelter;
  }
}
