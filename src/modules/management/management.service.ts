import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Management } from "./entities/management.entity";
import { Repository } from "typeorm";
import { CreateManagementDTO } from "./dto/request/createManagementDTO";
import { FindNeedsItem } from "./utils/findNeedItem";
import { FindNeedsVolunteer } from "./utils/findNeedVolunteer";
import { Address } from "../auth/entities/adress.enity";
import logger from "src/logger";
import { VerifyIfUserExits } from "./validators/verifyIfUserExits";
import { UserNearby } from "./utils/usersNearby";
import { VerifyIfShelterExits } from "./validators/verifyIfShelterExits";
import { geoResult } from "./utils/geoResult";
import { needValidator } from "./validators/needValidator";
import { createValidator } from "./validators/createValidators";
import { checkHours } from "./utils/BrasiliaTimeZone";

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
    private usersNearby: UserNearby,
    private verifyIfShelterExits: VerifyIfShelterExits,
  ){}

  async create(createManagementDTO: CreateManagementDTO): Promise<Management>{
  try{
   
    checkHours(createManagementDTO.collectionDate)
           
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
     throw new InternalServerErrorException('Erro ao registrar.')
    }         
  }
  
  async update(id: string, updates: Partial<CreateManagementDTO>): Promise<Management>{
   
    const management = await this.findById(id);
    if(!management){
      throw new BadRequestException('Demanda não encontrada.')
    }
    if(updates.coordinatorId){
      throw new UnauthorizedException('O coordenador não pode ser alterado.')
    }

    if(updates.shelterId){
      throw new UnauthorizedException('O abrigo não pode ser alterado.')
    }

    if(updates.collectionDate){
      checkHours(updates.collectionDate)
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
      relations: ['coordinator','collectPoint', 'needItem', 'needVolunteer', 'shelter', 'emailQueue']
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
    relations: ['coordinator','collectPoint', 'needItem', 'needVolunteer', 'shelter']
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
    if(!management){
      throw new BadRequestException('Demanda não encontrada.')
    }
    
    const needItem = await this.findNeedItem.findNeedItemById(needId);
    await needValidator(needItem)
    const needVolunteer = await this.findNeedVolunteer.findVolunteerItemById(needId)
    if(needItem && needVolunteer){
      throw new BadRequestException("Necessidade não encontrada.")
    }
    
    needValidator(needVolunteer)
    if(management.needVolunteer.some(volunteer => volunteer.id === needVolunteer.id)){
       management.needVolunteer.push(needVolunteer)  
       return await this.managementRepository.save(management)    
    }

    if(management.needItem.some(item => item.id === needItem.id)){
       management.needItem.push(needItem)
       return await this.managementRepository.save(management)
     }
     throw new ConflictException('Necessidade já cadastrada.')
        
   }catch (error) {
    logger.error(error);
    throw new InternalServerErrorException('Erro ao registrar.')
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
    throw new InternalServerErrorException('Erro ao registrar.')
  }

  }
  
  

}