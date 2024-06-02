import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { toPartnerEntity } from "./factory/toPartnerEntity";
import { InjectRepository } from "@nestjs/typeorm";
import { Address } from "../auth/entities/adress.enity";
import { Repository } from "typeorm";
import { Partner } from "./entities/partner.entity";
import { CreatePartnerDTO } from "./dto/request/CreatePartnerDTO";
import { FilesService } from "./utils/file.service";
import * as opencage from 'opencage-api-client';
import { EnvConfig } from 'src/config';
import { hash, compare } from 'bcrypt';


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

    const newAddress = await this.addressRepository.save(partner.address);
    const addressString = `${newAddress.logradouro}, ${newAddress.numero}, ${newAddress.bairro}, ${newAddress.municipio}, ${newAddress.estado}, ${newAddress.pais}`;
    const geocodeResult = await opencage.geocode({ q: addressString, key: EnvConfig.OPENCAGE.API_KEY });
    
    if (geocodeResult.results.length > 0) {
      const { lat, lng } = geocodeResult.results[0].geometry;
      newAddress.latitude = lat;
      newAddress.longitude = lng;
    }
    
    const updatedAddress = await this.addressRepository.save(newAddress);
    partner.address = updatedAddress;
    const logo = await this.fileService.save(file);
    partner.file = logo;

    return await this.partnerRepository.save(partner);
      
  }
  


  async update(userId: string, updates: Partial<Partner>): Promise<Partner>{

    const partner = await this.findById(userId);
  
    return await this.partnerRepository.save({  ...partner, ...updates})
    
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