import { BadRequestException, ConflictException, ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateManagementDTO } from "./dto/request/createManagementDTO";
import { Address } from "../auth/entities/adress.enity";
import logger from "src/logger";
import { Management } from "./entities/management.entity";
import { FindNeedsItem } from "./utils/findNeedItem";
import { FindNeedsVolunteer } from "./utils/findNeedVolunteer";
import { VerifyIfUserExits } from "../need/validator/user/verifyIfUserExits";
import { VerifyIfShelterExits } from "../need/validator/shelter/verifyIfShelterExits";
import { createValidator } from "./validators/createValidators";
import { geoResult } from "./utils/geoResult";
import { needValidator } from "./validators/needValidator";
import { UpdateManagementDTO } from "./dto/request/updateManagementDTO";

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
    private verifyIfShelterExits: VerifyIfShelterExits,
  ){}

  async create(createManagementDTO: CreateManagementDTO): Promise<Management>{
  try{            
    const management = new Management();
    management.collectionDate = createManagementDTO.collectionDate;

    const coordinator = await this.verifyIfUserExists.verifyIfUserExits(createManagementDTO.coordinatorId);
    createValidator(coordinator);
  
    management.coordinator = coordinator;
  
    const shelter = await this.verifyIfShelterExits.verifyIfShelterExits(createManagementDTO.shelterId);
    management.shelter = shelter;  
    
    const address = new Address();
    Object.assign(address, createManagementDTO.collectPoint);
    const newAddress = await this.addressRepository.create(address);
  
    const addressGeo = await geoResult(newAddress)
    const updatedAddress   = await this.addressRepository.save(addressGeo)
    management.collectPoint = updatedAddress;

    return await this.managementRepository.save(management)
    
   } catch (error) {
     logger.error(error);
     throw error
    }         
  }
  
  async update(id: string, updates: Partial<UpdateManagementDTO>): Promise<Management>{
   
    const management = await this.findById(id);
  
    if(!management){
      throw new BadRequestException('Demanda não encontrada.')
    }

    if (updates.collectPoint) {  
      const address = new Address();
      Object.assign(address, updates.collectPoint);
      const newAddress = await this.addressRepository.create(address);  
      const updatedAddress = await geoResult(newAddress)
      management.collectPoint = updatedAddress;
      await this.addressRepository.save(updatedAddress);
  }
    return await this.managementRepository.save({...management, ...updates})

  }

  async findById(id: string): Promise<Management>{
  try {
    const management = await this.managementRepository.findOne({
      where: { id: id },
      relations: ['coordinator','collectPoint', 'needItem', 'needVolunteer', 'shelter']
    });
    if(!management){
      return null;
    }
    return management;
    
  } catch (error) {
    logger.error(error);
    throw error
  }
  }


  async findAll(): Promise<Management[]>{
    try{
   return await this.managementRepository.find({
    relations: ['coordinator','collectPoint', 'needItem', 'needVolunteer', 'shelter']
   });
    } catch (error) {
      logger.error(error);
      throw new InternalServerErrorException('Erro ao realizar a pesquisa.')
    }
  }

  async findAllByUser(userId: string): Promise<Management[]>{
    try{
      return await this.managementRepository.find({
        where: {
          coordinator:{
            id: userId
          }
        },
        relations: ['coordinator', 'collectPoint', 'needItem', 'needVolunteer', 'shelter']
      });
    } catch (error) {
      logger.error(error);
      throw new InternalServerErrorException('Erro ao realizar a pesquisa.')
    }
  }

  async delete(demandId: string, coordinatorId: string){
      try {
        const demand = await this.findById(demandId);
        if(!demand){
          throw new BadRequestException("Demanda não encotrada.")
        }

        if(demand.coordinator.id != coordinatorId){
          throw new ForbiddenException("Usuário sem permissão para remover.")
        }

        if(demand){ 
        await this.managementRepository.delete(demandId);
        return { message: 'Demanda deletada com sucesso' };
        }
        throw new InternalServerErrorException('Erro ao registrar.')
        
      } catch (error) {
        logger.error(error);
        throw error;
      }
  }

  async addNeed(managementId: string, needId: string){
    try{

    const management = await this.findById(managementId);
    if(!management){
      throw new BadRequestException('Demanda não encontrada.')
    }    
    const needItem = await this.findNeedItem.findNeedItemById(needId);
    await needValidator(needItem)
    const needVolunteer = await this.findNeedVolunteer.findVolunteerItemById(needId)
    await needValidator(needVolunteer)
    if(needItem && needVolunteer){
      throw new BadRequestException("Necessidade não encontrada.")
    }
    
    if(!management.needVolunteer.some(volunteer => volunteer.id === needVolunteer.id)){
       management.needVolunteer.push(needVolunteer)  
       return await this.managementRepository.save(management)    
    } else if(!management.needItem.some(item => item.id === String(needItem.id))){
       management.needItem.push(needItem)
       return await this.managementRepository.save(management)
    } else {
     throw new ConflictException('Necessidade já cadastrada.')
    }
   }catch (error) {
    logger.error(error);
    throw error;
  }
  }

  async removeNeed(managementId: string, needId: string){
    try{

    const management = await this.findById(managementId);
    
    const needItem = await this.findNeedItem.findNeedItemById(needId);

    if(needItem){
      management.needItem = management.needItem.filter(item => item.id !== needItem.id);
    }
    
    const needVolunteer = await this.findNeedVolunteer.findVolunteerItemById(needId)
        
    if(needVolunteer){
      management.needVolunteer = management.needVolunteer.filter(item => item.id !== needVolunteer.id);
    }

     await this.managementRepository.save(management)
     return {message: 'Necessidade deletada com sucesso.'}
  }catch (error) {
    logger.error(error);
    throw error;
  }
  }
}