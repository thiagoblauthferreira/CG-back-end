import { Address } from "src/modules/auth/entities/adress.enity";

export class ResponseAddressDTO {

  cep: string;
  state: string;
  country: string;
  county: string;
  neighborhood: string;
  street: string;
  number: string;
  complement: string;

  constructor(address: Address){
    this.cep = address.cep,
    this.state = address.estado,
    this.country = address.pais,
    this.county = address.municipio,
    this.neighborhood = address.bairro,
    this.street = address.logradouro,
    this.number = address.numero,
    this.complement = address.complemento

  }
}