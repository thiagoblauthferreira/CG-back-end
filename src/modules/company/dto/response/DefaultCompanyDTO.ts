import { Company } from "../../entities/company.entity";

export class DefaultCompanyResponserDTO {

  
  id: string;
  tradeName: string;
  registeredName: string;
  email: string;
  cnpj: string;
  address: {
      cep: string;
      state: string;
      country: string;
      county: string;
      neighborhood: string;
      thoroughfare: string;
      number: string;
      additional: string | null;
  };
  file: {
    fileName: string | null;
    url: string | null;
  };
  partners: string[];

  constructor(company: Company) {
    this.id = company.id;
    this.tradeName = company.tradeName;
    this.registeredName = company.registeredName;
    this.email = company.email;
    this.cnpj = company.cnpj;
    this.address = {
      cep: company.address.cep,
      state: company.address.estado,
      country: company.address.pais,
      county: company.address.municipio,
      neighborhood: company.address.bairro,
      thoroughfare: company.address.logradouro,
      number: company.address.numero,
      additional: company.address.complemento
    };
    this.file = {
      fileName: company.fileEntity.fileName,
      url: company.fileEntity.url
    };
    this.partners = company.partner
  }
}

