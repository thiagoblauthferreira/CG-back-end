import { CreatePartnerDTO } from "../dto/request/CreatePartnerDTO";
import { Partner } from "../entities/partner.entity";
import { toAddressEntity } from "./toAddressEntity copy";

export function toPartnerEntity(createPartnerDTO: CreatePartnerDTO) {

  return new Partner(
    createPartnerDTO.tradeName,
    createPartnerDTO.registeredName,
    createPartnerDTO.email.toLowerCase(),
    createPartnerDTO.password,
    createPartnerDTO.cnpj,
    toAddressEntity(createPartnerDTO)
  )
}