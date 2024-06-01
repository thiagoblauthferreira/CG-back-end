import { CreateAddressDto } from "src/modules/auth/dto/adress.dto";
import { Partner } from "../../entities/partner.entity";

export class CreatePartnerResponserDTO {

  id: string;

  tradeName: string;

  registeredName: string;
 
  email: string;
  
  cnpj: string;

  address: CreateAddressDto;

  constructor(partner: Partner){
    this.tradeName = partner.tradeName,
    this.registeredName = partner.registeredName,
    this.email = partner.email,
    this.cnpj = partner.cnpj,
    this.address = partner.address
  }

}

