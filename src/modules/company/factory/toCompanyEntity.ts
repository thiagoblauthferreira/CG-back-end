import { CreateCompanyDTO } from "../dto/request/CreateCompanyDTO";
import { Company } from "../entities/company.entity";
import { toAddressEntity } from "./toAddressEntity";

export function toCompanyEntity(createCompanyDTO: CreateCompanyDTO) {

     const company = new Company()

    company.tradeName = createCompanyDTO.tradeName;
    company.registeredName = createCompanyDTO.registeredName;
    company.email = createCompanyDTO.email.toLowerCase();
    company.password = createCompanyDTO.password;
    company.cnpj = createCompanyDTO.cnpj;
    company.contact = createCompanyDTO.contact;
    company.address = toAddressEntity(createCompanyDTO);
    company.partner = createCompanyDTO.partner || [];
    company.isActive = true;
    return company;
    
}
