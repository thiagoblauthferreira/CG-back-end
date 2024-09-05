import { BadRequestException, Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/modules/auth/entities/auth.enity";
import { Repository } from "typeorm";

@Injectable()
export class VerifyIfUserExits {

  constructor(    
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
      )
    {}
   public async verifyIfUserExits(id: string): Promise<User> {
   
    const user = await this.userRepository.findOne({
      where: { id: id}
    });
  
    if(!user){
      throw new BadRequestException('Usuário não encontrado.');
    }
    return user;
  

  }

  
}