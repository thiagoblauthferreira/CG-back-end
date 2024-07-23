import { Injectable } from "@nestjs/common";
import { SearchDto } from "./dto/SearchDTO";
import { InjectRepository } from "@nestjs/typeorm";
import { Shelter } from "../shelter/entities/shelter.entity";
import { Repository } from "typeorm";
import { paginate, Pagination } from "nestjs-typeorm-paginate";
import { DistribuitionPoints } from "../distriuition-points/entities/distribuition-point.entity";
import { NeedVolunteers } from "../need/entities/needVolunteers.entity";
import { NeedItem } from "../need/entities/needItems.entity";

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
async findShelter(query: SearchDto): Promise<Pagination<Shelter>> {
  const { neighborhood, street, city, state, page = 1, pageSize = 10 } = query;

  const queryBuilder = this.shelterRepository.createQueryBuilder('shelter');
  
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

  return paginate(queryBuilder, { page, limit: pageSize });
}

async findDistribututionPoints(query: SearchDto): Promise<Pagination<DistribuitionPoints>>{
  const { neighborhood, street, city, state, page = 1, pageSize = 10 } = query;

  const queryBuilder = this.distributionRepository.createQueryBuilder('distribututionPoints');
  
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

  return paginate(queryBuilder, { page, limit: pageSize });

}
async findNeedVolunteer(query: SearchDto): Promise<Pagination<NeedVolunteers>>{
 
  const { neighborhood, street, city, state, page = 1, pageSize = 10 } = query;

  const queryBuilder = this.needVolunteerRepository.createQueryBuilder('needVolunteer');
  
  if (neighborhood) {
    queryBuilder.andWhere('needVolunteer.bairro ILIKE :neighborhood', { neighborhood: `%${neighborhood}%` });
  }
  if (street) {
    queryBuilder.andWhere('needVolunteer.rua ILIKE :street', { street: `%${street}%` });
  }
  if (city) {
    queryBuilder.andWhere('needVolunteer.cidade ILIKE :city', { city: `%${city}%` });
  }
  if (state) {
    queryBuilder.andWhere('needVolunteer.estado ILIKE :state', { state: `%${state}%` });
  }

  return paginate(queryBuilder, { page, limit: pageSize });

}

async findNeedItem(query: SearchDto): Promise<Pagination<NeedItem>>{
 
  const { neighborhood, street, city, state, page = 1, pageSize = 10 } = query;

  const queryBuilder = this.needItemRepository.createQueryBuilder('needItem');
  
  if (neighborhood) {
    queryBuilder.andWhere('needItem.bairro ILIKE :neighborhood', { neighborhood: `%${neighborhood}%` });
  }
  if (street) {
    queryBuilder.andWhere('needItem.rua ILIKE :street', { street: `%${street}%` });
  }
  if (city) {
    queryBuilder.andWhere('needItem.cidade ILIKE :city', { city: `%${city}%` });
  }
  if (state) {
    queryBuilder.andWhere('needItem.estado ILIKE :state', { state: `%${state}%` });
  }

  return paginate(queryBuilder, { page, limit: pageSize });

}
}