import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NeedVolunteers } from "src/modules/need/entities/needVolunteers.entity";
import { Repository } from "typeorm";

@Injectable()
export class FindNeedsVolunteer{

  constructor(
    @InjectRepository(NeedVolunteers)
    private needVolunteerRepository: Repository<NeedVolunteers>,
  ){}

  async findVolunteerItemById(id: string): Promise<NeedVolunteers>{
    const need = await this.needVolunteerRepository.findOne({
      where: { id: id},
      relations: ['shelter', 'coordinator']
    });
    if(!need){
      new BadRequestException('Necessidade não encontrada')
    }
    return need;
  }
}