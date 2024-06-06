import { Address } from "src/modules/auth/entities/adress.enity";
import { CreateCompanyDTO } from "../dto/request/CreateCompanyDTO";

export function toAddressEntity(createCompanyDTO: CreateCompanyDTO): Address {

  const address = new Address()
  address.cep = createCompanyDTO.cep;
  address.estado = createCompanyDTO.estado;
  address.pais = createCompanyDTO.pais;
  address.municipio = createCompanyDTO.municipio;
  address.bairro = createCompanyDTO.bairro;
  address.logradouro = createCompanyDTO.logradouro;
  address.numero = createCompanyDTO.numero;
  address.complemento = createCompanyDTO.complemento;

  return address;
}