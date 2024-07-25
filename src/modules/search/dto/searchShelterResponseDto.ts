import { User } from "src/modules/auth/entities/auth.enity";
import { Shelter } from "src/modules/shelter/entities/shelter.entity";
import { UserResponseDTO } from "./userResponseDTO";
import { ResponseAddressDTO } from "./responseAddressDTO";

export class SearchShelterResponseDto {
 
  id: string;
  name: string;
  phone: string;
  description: string;
  creator: UserResponseDTO;
  address: ResponseAddressDTO;
  coordinators: UserResponseDTO[];

  constructor(shelter: Shelter){
    this.id = shelter.id,
    this.name = shelter.name,
    this.phone = shelter.phone,
    this.description = shelter.description,
    this.creator = new UserResponseDTO(shelter.creator),
    this.address = new ResponseAddressDTO(shelter.address),
    this.coordinators = shelter.coordinators.map(u => new UserResponseDTO(u))
    }
}