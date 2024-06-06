import { Address } from "src/modules/auth/entities/adress.enity";

export class AddressResponseDto {
  cep: string;
  state: string;
  country: string;
  county: string;
  neighborhood: string;
  thoroughfare: string;
  number: string;
  additional: string;


  constructor(address: Address){
    this.cep = address.cep,
    this.state = address.estado,
    this.country = address.pais,
    this.county = address.municipio,
    this.neighborhood = address.bairro,
    this.thoroughfare = address.logradouro,
    this.number = address.numero,
    this.additional = address.complemento

  }
}