import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { toPartnerEntity } from "./factory/toPartnerEntity";
import { InjectRepository } from "@nestjs/typeorm";
import { Address } from "../auth/entities/adress.enity";
import { Repository } from "typeorm";
import { Partner } from "./entities/partner.entity";
import { CreatePartnerDTO } from "./dto/request/CreatePartnerDTO";
import { FilesService } from "./utils/file.service";
import { hash, compare } from 'bcrypt';
import { geoResult } from "./utils/geoResult";
import { deleteFile } from "./utils/deleteFIle";


@Injectable()
export class PartnerService {

  constructor(
    @InjectRepository(Partner)
    private partnerRepository: Repository<Partner>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    private fileService: FilesService

  ){}
  
  async create(createPartnerDTO: CreatePartnerDTO, file: Express.MulterS3.File): Promise<Partner>{
  
   const partner = await toPartnerEntity(createPartnerDTO);
    
    partner.password = await hash(partner.password, 10);

    const address = await this.addressRepository.save(partner.address);

    const newAddress = await geoResult(address);
    
    const updatedAddress = await this.addressRepository.save(newAddress);
    
    partner.address = updatedAddress;

    const logo = await this.fileService.save(file);
   
    partner.file = logo;

    return await this.partnerRepository.save(partner);
      
  }
  
  async update(partnerId: string, updates: Partial<Partner>, file?: Express.MulterS3.File): Promise<Partner>{

    const partner = await this.findById(partnerId);
   
    if (updates.password) {
       updates.password = await hash(updates.password, 10);
    }

    if(updates.address){
      const newAddress = await geoResult(updates.address);
      const updatedAddress = await this.addressRepository.save(newAddress);
      partner.address = updatedAddress;
    }
    if(file){
      await deleteFile(partner.file.url);
      const logo = await this.fileService.save(file);
      partner.file = logo;
    }
    
    const newPartner = await this.partnerRepository.save({  ...partner, ...updates})
    
    return newPartner
  }

  public async authenticate(email: string, password: string) {
  
    const partner = await this.findByEmail(email)

    const passwordMatches = await compare(password, partner.password);
    
    if (!passwordMatches) {
      throw new Error('Senha inválida');
    }
    return partner;
  }


  async findById(id: string): Promise<Partner>{
    const partner = await this.partnerRepository.findOne({
      where: {id: id}
    })
    if(!partner){
        throw new HttpException("Partner not found.", HttpStatus.NOT_FOUND)
    }
    return partner;
  }

  async delete(id: string): Promise<any>{

    const partner = await this.findById(id);
    partner.deletedAt = new Date();
    partner.isActive = false;
    await deleteFile(partner.file.url);
    await this.partnerRepository.save(partner)
    
    return {message: "Partner removed"};

  }

  async findAll(): Promise<Partner[]>{

    return await this.partnerRepository.find({
      where: {isActive: true}
    });
 
  }

 async findByEmail(email: string){
    const partner = await this.partnerRepository.findOne({ where: { email: email.toLowerCase() } });

    if (!partner) {
      throw new HttpException('Empresa não encontrada', HttpStatus.NOT_FOUND);
    }
    return partner; 
  }
 
}