import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { toPartnerEntity } from "./factory/toPartnerEntity";
import { InjectRepository } from "@nestjs/typeorm";
import { Address } from "../auth/entities/adress.enity";
import { Repository } from "typeorm";
import { Partner } from "./entities/partner.entity";
import { CreatePartnerDTO } from "./dto/request/CreatePartnerDTO";

@Injectable()
export class PartnerService {

  constructor(
    @InjectRepository(Partner)
    private partnerRepository: Repository<Partner>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>

  ){}
  
  async create(createPartnerDTO: CreatePartnerDTO): Promise<Partner>{

    const partner = toPartnerEntity(createPartnerDTO);

    const address = await this.addressRepository.save(partner.address);

    partner.address = address; 
    
    return await this.partnerRepository.save(partner);

  }

  async update(userId: string, updates: Partial<Partner>): Promise<Partner>{

    const partner = await this.findById(userId);
  
    return await this.partnerRepository.save({  ...partner, ...updates})
    
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

    await this.partnerRepository.save(partner)
    
    return {message: "Partner removed"};

  }

  async findAll(): Promise<Partner[]>{

    return await this.partnerRepository.find();
 
  }
}