import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Management } from "./entities/management.entity";
import { Repository } from "typeorm";
import { CreateManagementDTO } from "./dto/request/createManagementDTO";
import { FindNeedsItem } from "./utils/findNeedItem";
import { FindNeedsVolunteer } from "./utils/findNeedVolunteer";
import { Address } from "../auth/entities/adress.enity";
import { EnvConfig } from "src/config";
import logger from "src/logger";
import * as opencage from 'opencage-api-client';
import { VerifyIfUserExits } from "./validators/verifyIfUserExits";

@Injectable()
export class ManagementService {

  constructor(
    @InjectRepository(Management)
    private managementRepository: Repository<Management>,
    private findNeedItem: FindNeedsItem,
    private findNeedVolunteer: FindNeedsVolunteer,
    private verifyIfUserExists: VerifyIfUserExits,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ){}

  async create(createManagementDTO: CreateManagementDTO): Promise<Management>{
  try{
   
    const management = new Management();
    management.collectionData = createManagementDTO.collectionData;

    const coordinator = await this.verifyIfUserExists.verifyIfUserExits(createManagementDTO.coordinatorId);
    management.coordinator = coordinator;
    const address = new Address();
    Object.assign(address, createManagementDTO.collectPoint);
    const newAddress = await this.addressRepository.save(address);
    const addressString = `${newAddress.logradouro}, ${newAddress.numero}, ${newAddress.bairro}, ${newAddress.municipio}, ${newAddress.estado}, ${newAddress.pais}`;
    const geocodeResult = await opencage.geocode({ q: addressString, key: EnvConfig.OPENCAGE.API_KEY });
    if (geocodeResult.results.length > 0) {
      const { lat, lng } = geocodeResult.results[0].geometry;
      newAddress.latitude = lat;
      newAddress.longitude = lng;
    }
    const updatedAddress = await this.addressRepository.save(newAddress);
    management.collectPoint = updatedAddress;
    management.collectPoint = newAddress;

    return await this.managementRepository.save(management);
   } catch (error) {
     logger.error(error);
     throw new InternalServerErrorException('Erro ao registrar.')
    }         
  }
  
  async update(id: string, updates: Partial<CreateManagementDTO>): Promise<Management>{
    const management = await this.findById(id);
    if(!management){
      throw new BadRequestException('Demanda não encontrada.')
    }

    if (updates.collectPoint) {
      const newAddress = new Address();
      Object.assign(newAddress, updates.collectPoint);
  
      const savedAddress = await this.addressRepository.save(newAddress);
  
      const addressString = `${savedAddress.logradouro}, ${savedAddress.numero}, ${savedAddress.bairro}, ${savedAddress.municipio}, ${savedAddress.estado}, ${savedAddress.pais}`;
  
      const geocodeResult = await opencage.geocode({ q: addressString, key: EnvConfig.OPENCAGE.API_KEY });
      
      if (geocodeResult.results.length > 0) {
        const { lat, lng } = geocodeResult.results[0].geometry;
        savedAddress.latitude = lat;
        savedAddress.longitude = lng;
      }
  
      const updatedAddress = await this.addressRepository.save(savedAddress);
  
      management.collectPoint = updatedAddress;
    }

    return await this.managementRepository.save(management)

  }

  async findById(id: string): Promise<Management>{
  try {
    const management = await this.managementRepository.findOne({
      where: { id: id },
      relations: ['coordinator','collectPoint', 'needItem', 'needVolunteer']
    });
    if(!management){
      return null;
    }
    return management;
    
  } catch (error) {
    logger.error(error);
    throw new InternalServerErrorException('Erro ao registrar.')
  }
  }
  async findAll(): Promise<Management[]>{
    try{
   return await this.managementRepository.find({
    relations: ['coordinator','collectPoint', 'needItem', 'needVolunteer']
   });
    } catch (error) {
      logger.error(error);
      throw new InternalServerErrorException('Erro ao realizar a pesquisa.')
    }
  }
   async delete(id: string){
      try {
        const demand = await this.findById(id);
        if(!demand){       
        await this.managementRepository.delete(id);
        return { message: 'Demanda deletada com sucesso' };
        }
        throw new InternalServerErrorException('Erro ao registrar.')
        

      } catch (error) {
        logger.error(error);
        throw new InternalServerErrorException('Erro ao registrar.')
      }
  }

  async addNeed(managementId: string, needId: string){
    try{

    const management = await this.findById(managementId);
    
    const needItem = await this.findNeedItem.findNeedItemById(needId);
    
    const needVolunteer = await this.findNeedVolunteer.findVolunteerItemById(needId)
    
    if(needItem){
      management.needItem.push(needItem)
    }
    if(needVolunteer){
      management.needVolunteer.push(needVolunteer)
    }

    return await this.managementRepository.save(management)
  }catch (error) {
    logger.error(error);
    throw new InternalServerErrorException('Erro ao registrar.')
  }

  }

  async removeNeed(managementId: string, needId: string){
    try{

    const management = await this.findById(managementId);
    
    const needItem = await this.findNeedItem.findNeedItemById(needId);
    
    const needVolunteer = await this.findNeedVolunteer.findVolunteerItemById(needId)
    
    if(needItem){
      management.needItem = management.needItem.filter(item => item.id !== needItem.id);
    }
    if(needVolunteer){
      management.needVolunteer = management.needVolunteer.filter(item => item.id !== needVolunteer.id);
    }

     await this.managementRepository.save(management)
     return {message: 'Necessidade deletada com sucesso.'}
  }catch (error) {
    logger.error(error);
    throw new InternalServerErrorException('Erro ao registrar.')
  }

  }
}