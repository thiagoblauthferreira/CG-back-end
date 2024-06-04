import { Partner } from "../../entities/partner.entity";

export class UpdatePartnerResponserDTO {

  id: string;
  tradeName: string;
  registeredName: string;
  email: string;
  cnpj: string;
  address: {
    cep: string;
    estado: string;
    pais: string;
    municipio: string;
    bairro: string;
    logradouro: string;
    numero: string;
    complemento: string | null;
  };
  file: {
    fileName: string;
    url: string;
  };
  
  constructor(partner: Partner){
    this.id = partner.id;
    this.tradeName = partner.tradeName;
    this.registeredName = partner.registeredName;
    this.email = partner.email;
    this.cnpj = partner.cnpj;
    this.address = {
      cep: partner.address.cep,
      estado: partner.address.estado,
      pais: partner.address.pais,
      municipio: partner.address.municipio,
      bairro: partner.address.bairro,
      logradouro: partner.address.logradouro,
      numero: partner.address.numero,
      complemento: partner.address.complemento
    };
     this.file = {
      fileName: partner.file.fileName,
      url: partner.file.url
    };
  }

}

