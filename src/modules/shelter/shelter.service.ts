import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shelter } from './entities/shelter.entity';
import { ShelterMessagesHelper } from './helpers/shelter.helper';
import { UpdateShelterDto, CreateShelterDto } from './dto';

@Injectable()
export class ShelterService {
  constructor(
    @InjectRepository(Shelter)
    private shelterRepository: Repository<Shelter>,
  ) {}

  async create(createShelter: CreateShelterDto) {
    const shelter = this.shelterRepository.create(createShelter);
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
      relations: { user: true },
    });

    if (!shelter) {
      throw new NotFoundException(ShelterMessagesHelper.SHELTER_NOT_FOUND);
    }

    return shelter;
  }

  async listAll() {
    return await this.shelterRepository.find({
      relations: {
        user: true,
      },
    });
  }

  async remove(shelterId: string) {
    const shelter = await this.findOne(shelterId);
    shelter.deletedAt = new Date();

    await this.shelterRepository.save(shelter);

    return { message: ShelterMessagesHelper.SHELTER_DELETED };
  }
}
