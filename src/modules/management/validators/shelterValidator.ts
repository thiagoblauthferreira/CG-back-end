import { NotFoundException } from "@nestjs/common";
import { User } from "src/modules/auth/entities/auth.enity";
import { Shelter } from "src/modules/shelter/entities/shelter.entity";

export function shelterValidator(shelter: Shelter, coordinator: User){
  if(!shelter.coordinators.some(user => user.id === coordinator.id)){
      throw new NotFoundException('Usuário sem permissão para agendar para o abrigo.')
  }
}