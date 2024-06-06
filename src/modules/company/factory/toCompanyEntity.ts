import { CreateCompanyDTO } from "../dto/request/CreateCompanyDTO";
import { Company } from "../entities/company.entity";
import { toAddressEntity } from "./toAddressEntity";

export function toCompanyEntity(createCompanyDTO: CreateCompanyDTO) {

  return new Company(
    createCompanyDTO.tradeName,
    createCompanyDTO.registeredName,
    createCompanyDTO.email.toLowerCase(),
    createCompanyDTO.password,
    createCompanyDTO.cnpj,
    toAddressEntity(createCompanyDTO)
  )
}