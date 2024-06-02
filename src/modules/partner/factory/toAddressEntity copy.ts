import { Address } from "src/modules/auth/entities/adress.enity";
import { CreatePartnerDTO } from "../dto/request/CreatePartnerDTO";

export function toAddressEntity(createPartnerDTO: CreatePartnerDTO): Address {

  const address = new Address()
  address.cep = createPartnerDTO.cep;
  address.estado = createPartnerDTO.estado;
  address.pais = createPartnerDTO.pais;
  address.municipio = createPartnerDTO.municipio;
  address.bairro = createPartnerDTO.bairro;
  address.logradouro = createPartnerDTO.logradouro;
  address.numero = createPartnerDTO.numero;

  return address;
}