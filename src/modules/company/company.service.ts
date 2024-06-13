import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { toCompanyEntity } from "./factory/toCompanyEntity";
import { InjectRepository } from "@nestjs/typeorm";
import { Address } from "../auth/entities/adress.enity";
import { Repository } from "typeorm";
import { FilesService } from "./utils/file.service";
import { hash, genSalt } from 'bcrypt';
import { geoResult } from "./utils/geoResult";
import { deleteFile } from "./utils/deleteFIle";
import { Company } from "./entities/company.entity";
import { CreateCompanyDTO } from "./dto/request/CreateCompanyDTO";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "../auth/payload/jwt.payload";


@Injectable()
export class CompanyService {

  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    private jwtService: JwtService,
    private fileService: FilesService,
    

  ){}

  async validateCompany(payload: JwtPayload) {
    if(payload.roles.includes("company")) {
      const company = await this.companyRepository.findOne({ where: { id: payload.sub } });
   
      if (!company || company.tradeName !== payload.username) {
          throw new UnauthorizedException();
      }
      
      return company;
      
  }
 
  return null;
  }
 
  async create(createCompanyDTO: CreateCompanyDTO, file: Express.MulterS3.File): Promise<any>{
  
    const company = await toCompanyEntity(createCompanyDTO);
    const validation = await this.validations(company)

    if (validation) {
      throw new ConflictException("Usuário já cadastrado");
    }
    //Lógica endereços
    const salt = await genSalt()
    company.password = await hash(company.password, salt);
    const address = await this.addressRepository.save(company.address);
    const newAddress = await geoResult(address);
    const updatedAddress = await this.addressRepository.save(newAddress);
    company.address = updatedAddress;
  
    //Lógica logo
    const logo = await this.fileService.save(file);
    company.fileEntity = logo
    
    //Lógica para adicionar a nova empresa;
    const newCompany = await this.companyRepository.save(company);
    const payload = { username: newCompany.tradeName, sub: newCompany.id, roles: ['donor', 'company'] };
    const token = this.jwtService.sign(payload);
    return { token }
 
  }
  
  async update(companyId: string, updates: Partial<Company>, file?: Express.MulterS3.File): Promise<Company>{

    const company = await this.profile(companyId);

    if(updates.cnpj && updates.cnpj != company.cnpj){
      await this.findByCNPJValidation(updates.cnpj);
    }

    if(updates.email && updates.email != company.email){
      await this.findByEmailValidation(updates.email);
    }
   
    if (updates.password) {
       const salt = await genSalt(10);
       updates.password = await hash(updates.password, salt);
    }

    if(updates.address){
      const newAddress = await geoResult(updates.address);
      const updatedAddress = await this.addressRepository.save(newAddress);
      company.address = updatedAddress;
    }
    if(file){
      await deleteFile(company.fileEntity.url);
      const logo = await this.fileService.save(file);
      company.fileEntity = logo;
    }
    //partners devem ser enviados ao todo
    if (updates.partner) {
      company.partner = updates.partner;
    }
      
    const newCompany = await this.companyRepository.save({  ...company, ...updates})
    
    return newCompany
  }

  async profile(id: string): Promise<Company>{
    const company = await this.findById(id)

    if(!company){
        throw new NotFoundException("Usuário não encontrado")
    }
    return company;
  }
  async delete(id: string): Promise<any>{

    const company = await this.profile(id);
    company.deletedAt = new Date();
    company.isActive = false;
    await deleteFile(company.fileEntity.url);
    await this.companyRepository.delete(company.id)
    
    return {message: "Conta removida."};

  }

  async findAll(): Promise<Company[]>{
    return await this.companyRepository.find({
      where: {isActive: true}
    });
 
  }

 async findByEmail(email: string){
    return await this.companyRepository.findOne({ where: { email: email.toLowerCase() } });
      
  }

  async findById(id: string){
    const company = await this.companyRepository.findOne({ where: { id: id } });
    
     if(!company){
      throw new NotFoundException('Usuário não encontrado.')
    }
     return company
  }

  async findByCNPJValidation(cnpj: string){
    const company = await this.companyRepository.findOne({ where: { cnpj: cnpj } });
  
    if (company) {
      throw new ConflictException('CNPJ já cadastrado.');
    }
    
  }

  async findByEmailValidation(email: string){
    const company = await this.companyRepository.findOne({ where: { email: email } });
    
    if (company) {
      throw new ConflictException('E-mail já cadastrado.');
    }
  }

  private async validations(company: Company): Promise<boolean>{
    const companyExists = await this.companyRepository.findOne({ where: [{ email: company.email.toLowerCase()}, {cnpj: company.cnpj}] });
    if (companyExists) {
    return true
    }
     return false;
   }

  public async findNearbyCompany(companyId: string, radius: number) {
    
    const company = await this.companyRepository.findOne({ 
      where: { id: companyId },
      relations: ["address"]
    });
  
    if (!company) {
      throw new NotFoundException("Usuário não encontrado");
    }
    const companyLatitude = company.address.latitude;
    const companyLongitude = company.address.longitude;
  
    const query = this.companyRepository
          .createQueryBuilder("company")
          .select(["company.id", "company.tradeName"]) // Select only the fields you want to return
          .addSelect(["address.latitude", "address.longitude"]) // Select only the fields you want from the address
          .leftJoin("company.address", "address")
          .where(`6371 * acos(cos(radians(:companyLatitude)) * cos(radians(address.latitude)) * cos(radians(address.longitude) - radians(:companyLongitude)) + sin(radians(:companyLatitude)) * sin(radians(address.latitude))) < :radius`, {
            companyLatitude,
            companyLongitude,
            radius
          })
          .andWhere("company.id != :companyId", { companyId });  
  
      return await query.getMany();
  }


}