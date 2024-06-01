import { CreatePartnerDTO } from "../dto/request/CreatePartnerDTO";
import { Partner } from "../entities/partner.entity";

export function toPartnerEntity(createPartnerDTO: CreatePartnerDTO) {

  return new Partner(
    createPartnerDTO.tradeName,
    createPartnerDTO.registeredName,
    createPartnerDTO.email,
    createPartnerDTO.cnpj,
    createPartnerDTO.address,
  )
}