import { Address } from "src/modules/auth/entities/adress.enity";
import { CreateCompanyDTO } from "../dto/request/CreateCompanyDTO";

export function toAddressEntity(createCompanyDTO: CreateCompanyDTO): Address {

  const address = new Address()
  address.cep = createCompanyDTO.cep;
  address.estado = createCompanyDTO.state;
  address.pais = createCompanyDTO.country;
  address.municipio = createCompanyDTO.county;
  address.bairro = createCompanyDTO.neighborhood;
  address.logradouro = createCompanyDTO.street;
  address.numero = createCompanyDTO.number;
  address.complemento = createCompanyDTO.complement;

  return address;
}