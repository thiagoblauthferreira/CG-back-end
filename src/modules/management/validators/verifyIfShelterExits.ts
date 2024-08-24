import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Shelter } from "src/modules/shelter/entities/shelter.entity";
import { Repository } from "typeorm";

@Injectable()
export class VerifyIfShelterExits {

  constructor(    
    @InjectRepository(Shelter)
    private readonly shelterRepository: Repository<Shelter>,
      )
    {}
   public async verifyIfShelterExits(id: string): Promise<Shelter> {
    
    const shelter = await this.shelterRepository.findOne({
      where: { id: id},
      relations: ['coordinators']
    });
  
    if(!shelter){
      throw new BadRequestException('Abrigo não encontrado.');
    }
    return shelter;

  }
  
}