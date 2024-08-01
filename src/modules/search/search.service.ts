import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { SearchDto } from "./dto/searchDTO";
import { InjectRepository } from "@nestjs/typeorm";
import { Shelter } from "../shelter/entities/shelter.entity";
import { Repository } from "typeorm";
import { DistribuitionPoints } from "../distriuition-points/entities/distribuition-point.entity";
import { NeedVolunteers } from "../need/entities/needVolunteers.entity";
import { NeedItem } from "../need/entities/needItems.entity";
import { RequestShelterDTO } from "./dto/requestShelterDTO";
import { RequestNeedsDTO } from "./dto/requestNeedsDTO";
import logger from "src/logger";
import { Priority } from "../need/enums/enumPriority";
import { Status } from "../need/enums/enumsStatus";
import { RequestNearbyDTO } from "./dto/requestNearbyDTO";
import { Address } from "../auth/entities/adress.enity";
import { geoResult } from "../company/utils/geoResult";

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Shelter)
    private shelterRepository: Repository<Shelter>,
    @InjectRepository(DistribuitionPoints)
    private distributionRepository: Repository<DistribuitionPoints>,
    @InjectRepository(NeedVolunteers)
    private needVolunteerRepository: Repository<NeedVolunteers>,
    @InjectRepository(NeedItem)
    private needItemRepository: Repository<NeedItem>
  ){}
//Shelter
async findShelter(query: RequestShelterDTO): Promise<Shelter[]> {
  const { name, neighborhood, street, city, state } = query;

  const queryBuilder = this.shelterRepository.createQueryBuilder('shelter')
    .leftJoinAndSelect('shelter.address', 'address')
    .leftJoinAndSelect('shelter.creator', 'creator')
    .select([
      'shelter.id',
      'shelter.name',
      'shelter.phone',
      'shelter.description',
      'address.bairro',
      'address.logradouro',
      'address.municipio',
      'address.estado',
      'address.numero',
      'address.complemento',
      'address.cep',
      'creator.id',
      'creator.name',
      'creator.email'
    ]);

  if (name) {
    queryBuilder.andWhere('shelter.name ILIKE :name', { name: `%${name}%` });
  
  }
  if (neighborhood) {
    queryBuilder.andWhere('address.bairro ILIKE :neighborhood', { neighborhood: `%${neighborhood}%` });
  }
  if (street) {
    queryBuilder.andWhere('address.logradouro ILIKE :street', { street: `%${street}%` });
  }
  if (city) {
    queryBuilder.andWhere('address.municipio ILIKE :city', { city: `%${city}%` });
  }
  if (state) {
    queryBuilder.andWhere('address.estado ILIKE :state', { state: `%${state}%` });
  }

  try {
    return await queryBuilder.getMany();
  } catch (error) {
    logger.error(error);
    throw new InternalServerErrorException('Erro ao buscar abrigos');
  }
}


async findDistribututionPoints(query: RequestShelterDTO): Promise<DistribuitionPoints[]>{
  const { name, neighborhood, street, city, state } = query;

  const queryBuilder = this.distributionRepository.createQueryBuilder('d')
    .leftJoin('d.address', 'address')
    .leftJoinAndSelect('d.creator', 'creator')
    .select([
      'd.id',
      'd.name',
      'd.phone',
      'd.description',
      'd.creator',
      'address.bairro',
      'address.logradouro',
      'address.municipio',
      'address.estado',
      'address.numero',
      'address.complemento',
      'address.cep',
      'creator.id',
      'creator.name',
      'creator.email'
    ]);

  if (name) {
    queryBuilder.andWhere('d.name ILIKE :name', { name: `%${name}%` });
  }

  if (neighborhood) {
    queryBuilder.andWhere('address.bairro ILIKE :neighborhood', { neighborhood: `%${neighborhood}%` });
  }
  if (street) {
    queryBuilder.andWhere('address.logradouro ILIKE :street', { street: `%${street}%` });
  }
  if (city) {
    queryBuilder.andWhere('address.municipio ILIKE :city', { city: `%${city}%` });
  }
  if (state) {
    queryBuilder.andWhere('address.estado ILIKE :state', { state: `%${state}%` });
  }

  try {
    return await queryBuilder.getMany();
  } catch (error) {
    logger.error(error);
    throw new InternalServerErrorException('Erro ao buscar pontos de distribuição');
  }
}
async findNeedVolunteer(query: RequestNeedsDTO): Promise<NeedVolunteers[]>{
 
  const { title, status, priority, shelter, sortBy, sortOrder  } = query;

  const queryBuilder = this.needVolunteerRepository.createQueryBuilder('n')
  .leftJoinAndSelect('n.shelter', 'shelter')
  .leftJoinAndSelect('n.coordinator', 'coordinator')
  .select([
    "n.id",
    "n.title",
    "n.description",
    "n.status",
    "n.priority",
    "n.limitDate",
    "coordinator.name",
    "coordinator.username",
    "coordinator.email",
    "shelter.id",
    "shelter.phone",
    "shelter.name",
  ]);

  if (title) {
      queryBuilder.andWhere('n.title ILIKE :title', { title: `%${title}%` });
  }
  if (status) {
    queryBuilder.andWhere('n.status = :status', { status });
  }
  if (priority) {
    queryBuilder.andWhere('n.priority = :priority', { priority }); 
  } 
  if (shelter) {
    queryBuilder.andWhere('shelter.name ILIKE :shelter', { shelter: `%${shelter}%` });
  }
  if (sortBy) {
    const order = sortOrder?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    if (sortBy === 'priority') {
      queryBuilder.orderBy('n.priority', order);
    } else if (sortBy === 'status') {
      queryBuilder.orderBy('n.status', order);
    }
  }
  
  try{
  return await queryBuilder.getMany();
  }catch (error) {
    logger.error(error);
    throw new InternalServerErrorException('Erro ao buscar necessidades de voluntariado');
  }
}

async findNeedItem(query: RequestNeedsDTO): Promise<NeedItem[]> {
  const { title, status, priority, shelter,  sortBy, sortOrder } = query;

  const queryBuilder = this.needItemRepository.createQueryBuilder('n')
    .leftJoinAndSelect('n.shelter', 'shelter')
    .leftJoinAndSelect('n.coordinator', 'coordinator')
    .select([
      "n.id", 
      "n.title", 
      "n.description",       
      "n.status", 
      "n.priority",
      "n.limitDate",
      "coordinator.name",
      "coordinator.username",
      "coordinator.email",
      "shelter.id",
      "shelter.phone",
      "shelter.name",
      ]);


    if (title) {
        queryBuilder.andWhere('n.title ILIKE :title', { title: `%${title}%` });
    }
    if (status) {
      queryBuilder.andWhere('n.status = :status', { status });
    }
    if (priority) {
      queryBuilder.andWhere('n.priority = :priority', { priority }); 
    } 

    if (shelter) {
      queryBuilder.andWhere('shelter.name ILIKE :shelter', { shelter: `%${shelter}%` });
    }
    if (sortBy) {
      const order = sortOrder?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
      if (sortBy === 'priority') {
        queryBuilder.orderBy('n.priority', order);
      } else if (sortBy === 'status') {
        queryBuilder.orderBy('n.status', order);
      }
    }
  try {
  return await queryBuilder.getMany();
  }catch (error) {
    logger.error(error);
    throw new InternalServerErrorException('Erro ao buscar necessidades.');
  }
}

async findNearbyShelter(query: RequestNearbyDTO): Promise<Shelter[]> {
  const radius: number = Number(query.radius);
 
  if (isNaN(radius)) {
    throw new BadRequestException('Valor inválido para o raio');
  }
  
  const newAddress = await this.convertToAddress(query);

  const userLatitude: number = newAddress.latitude;
  const userLongitude: number = newAddress.longitude;

  const queryBuilder = this.shelterRepository.createQueryBuilder('s')
  .leftJoinAndSelect('s.address', 'address')
  .leftJoinAndSelect('s.creator', 'creator')
  .select([
    's.id',
    's.name',
    's.phone',
    's.description',
    'address.bairro',
    'address.logradouro',
    'address.municipio',
    'address.estado',
    'address.numero',
    'address.complemento',
    'address.cep',
    'creator.id',
    'creator.name',
    'creator.email'
  ])
    .where(`6371 * acos(cos(radians(:userLatitude)) * cos(radians(address.latitude)) * cos(radians(address.longitude) - radians(:userLongitude)) + sin(radians(:userLatitude)) * sin(radians(address.latitude))) < :radius`, {
      userLatitude,
      userLongitude,
      radius
    });

  try {
    return await queryBuilder.getMany();
  } catch (error) {
    logger.error('Error querying nearby shelters', error);
    throw new InternalServerErrorException('Error querying nearby shelters');
  }
}

async findNearbyDistributionPoint(query: RequestNearbyDTO): Promise<DistribuitionPoints[]> {
  
  const radius: number = Number(query.radius);
 
  if (isNaN(radius)) {
    throw new BadRequestException('Valor inválido para o raio');
  }
  
  const newAddress = await this.convertToAddress(query);

  const userLatitude: number = newAddress.latitude;
  const userLongitude: number = newAddress.longitude;

  const queryBuilder = this.distributionRepository.createQueryBuilder('d')
    .leftJoinAndSelect('d.address', 'address')
    .leftJoinAndSelect('d.creator', 'creator')
    .select([
      'd.id',
      'd.name',
      'd.phone',
      'd.description',
      'd.creator',
      'address.bairro',
      'address.logradouro',
      'address.municipio',
      'address.estado',
      'address.numero',
      'address.complemento',
      'address.cep',
      'address.latitude',
      'address.longitude',
      'creator.id',
      'creator.name',
      'creator.email'
    ])
    .where(`6371 * acos(cos(radians(:userLatitude)) * cos(radians(address.latitude)) * cos(radians(address.longitude) - radians(:userLongitude)) + sin(radians(:userLatitude)) * sin(radians(address.latitude))) < :radius`, {
      userLatitude,
      userLongitude,
      radius
    });

  try {
    return await queryBuilder.getMany();
  } catch (error) {
    logger.error('Error querying nearby shelters', error);
    throw new InternalServerErrorException('Error querying nearby shelters');
  }
}

private async convertToAddress(query: RequestNearbyDTO){
  const { radius, street, number, city, state } = query;
  Number(radius)
  
  const address: Address = new Address();
  address.logradouro = street;
  address.numero = number;
  address.bairro = street;
  address.municipio = city;
  address.estado = state;
  address.pais = 'Brazil';

  try {
    const newAddress = await geoResult(address);
  
    return newAddress;

  } catch (error) {
    logger.error('Falha na geolocalização.', error);
    throw new InternalServerErrorException('Falha na geolocalização.');
  }
}

}