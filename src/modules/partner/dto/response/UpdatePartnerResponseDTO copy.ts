import { Partner } from "../../entities/partner.entity";
import { AddressResponseDto } from "./AddressResponseDTO";

export class UpdatePartnerResponserDTO {

  id: string;
  tradeName: string;
  registeredName: string;
  email: string;
  cnpj: string;
  address: AddressResponseDto;
  createAt: Date;
  updateAt: Date;
  constructor(partner: Partner){
    this.tradeName = partner.tradeName,
    this.registeredName = partner.registeredName,
    this.email = partner.email,
    this.cnpj = partner.cnpj,
    this.address = new AddressResponseDto(partner.address)
    this.createAt = partner.createdAt,
    this.updateAt = partner.updatedAt
  }

}

