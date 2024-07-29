import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { SearchDto } from "./dto/searchDTO";
import { InjectRepository } from "@nestjs/typeorm";
import { Shelter } from "../shelter/entities/shelter.entity";
import { Repository } from "typeorm";
import { DistribuitionPoints } from "../distriuition-points/entities/distribuition-point.entity";
import { NeedVolunteers } from "../need/entities/needVolunteers.entity";
import { NeedItem } from "../need/entities/needItems.entity";
import { RequestShelterDTO } from "./dto/requestShelterDTO";
import { RequestNeedsDTO } from "./dto/requestNeedsDTO";

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
  const { name, neighborhood, street, city, state} = query;

  const queryBuilder = this.shelterRepository.createQueryBuilder('shelter')
  .leftJoinAndSelect('shelter.address', 'address');
 
  if (name) {
    queryBuilder.andWhere('shelter.name ILIKE :name', { name: `%${name}%` });
  }

  if (neighborhood) {
    queryBuilder.andWhere('shelter.bairro ILIKE :neighborhood', { neighborhood: `%${neighborhood}%` });
  }
  if (street) {
    queryBuilder.andWhere('shelter.rua ILIKE :street', { street: `%${street}%` });
  }
  if (city) {
    queryBuilder.andWhere('shelter.cidade ILIKE :city', { city: `%${city}%` });
  }
  if (state) {
    queryBuilder.andWhere('shelter.estado ILIKE :state', { state: `%${state}%` });
  }
  try {
  return await queryBuilder.getMany()
  }catch (error) {
    throw new InternalServerErrorException('Erro ao buscar abrigos');
  }
}

async findDistribututionPoints(query: RequestShelterDTO): Promise<DistribuitionPoints[]>{
  const { name, neighborhood, street, city, state } = query;

  const queryBuilder = this.distributionRepository.createQueryBuilder('distribututionPoints');
  
  if (name) {
    queryBuilder.andWhere('shelter.name ILIKE :name', { name: `%${name}%` });
  }

  if (neighborhood) {
    queryBuilder.andWhere('distribututionPoints.bairro ILIKE :neighborhood', { neighborhood: `%${neighborhood}%` });
  }
  if (street) {
    queryBuilder.andWhere('distribututionPoints.rua ILIKE :street', { street: `%${street}%` });
  }
  if (city) {
    queryBuilder.andWhere('distribututionPoints.cidade ILIKE :city', { city: `%${city}%` });
  }
  if (state) {
    queryBuilder.andWhere('distribututionPoints.estado ILIKE :state', { state: `%${state}%` });
  }
  try{
  return await queryBuilder.getMany();
  }catch (error) {
    throw new InternalServerErrorException('Erro ao buscar abrigos');
  }
}
async findNeedVolunteer(query: RequestNeedsDTO): Promise<NeedVolunteers[]>{
 
  const { title, status, priority, neighborhood, street, city, state } = query;

  const queryBuilder = this.needVolunteerRepository.createQueryBuilder('n')
    .select(["n.id", "n.title", "n.address", "n.description", "n.shelter", "n.status", "n.priority", "n.limitDate"]);

  if (title) {
      queryBuilder.andWhere('n.title ILIKE :title', { title: `%${title}%` });
  }
  if (status) {
    queryBuilder.andWhere('n.status ILIKE :status', { title: `%${status}%` });
  }
  if (priority) {
    queryBuilder.andWhere('n.priority ILIKE :neighborhood', { title: `%${priority}%` });
} 
  if (neighborhood) {
      queryBuilder.andWhere('n.bairro ILIKE :neighborhood', { neighborhood: `%${neighborhood}%` });
  } 

  if (street) {
    queryBuilder.andWhere('n.rua ILIKE :street', { street: `%${street}%` });
  }

  if (city) {
    queryBuilder.andWhere('n.cidade ILIKE :city', { city: `%${city}%` });
  }

  if (state) {
    queryBuilder.andWhere('n.estado ILIKE :state', { state: `%${state}%` });
  }
  try{
  return await queryBuilder.getMany();
  }catch (error) {
    throw new InternalServerErrorException('Erro ao buscar necessidades de voluntariado');
  }
}

async findNeedItem(query: RequestNeedsDTO): Promise<NeedItem[]> {
  const { title, status, priority, neighborhood, street, city, state } = query;

  const queryBuilder = this.needItemRepository.createQueryBuilder('n')
    .select(["n.id", "n.title", "n.address", "n.description", "n.shelter", "n.status", "n.priority", "n.limitDate"]);


    if (title) {
        queryBuilder.andWhere('n.title ILIKE :title', { title: `%${title}%` });
    }
    if (status) {
      queryBuilder.andWhere('n.status ILIKE :status', { title: `%${status}%` });
    }
    if (priority) {
      queryBuilder.andWhere('n.priority ILIKE :neighborhood', { title: `%${priority}%` });
    } 
 if (neighborhood) {
    queryBuilder.andWhere('n.bairro ILIKE :neighborhood', { neighborhood: `%${neighborhood}%` });
  }

  if (street) {
    queryBuilder.andWhere('n.rua ILIKE :street', { street: `%${street}%` });
  }

  if (city) {
    queryBuilder.andWhere('n.cidade ILIKE :city', { city: `%${city}%` });
  }

  if (state) {
    queryBuilder.andWhere('n.estado ILIKE :state', { state: `%${state}%` });
  }
  try {
  return await queryBuilder.getMany();
  }catch (error) {
    throw new InternalServerErrorException('Erro ao buscar abrigos');
  }
}
}