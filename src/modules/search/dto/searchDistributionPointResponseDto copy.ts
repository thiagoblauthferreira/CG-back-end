import { UserResponseDTO } from "./userResponseDTO";
import { ResponseAddressDTO } from "./responseAddressDTO";
import { DistribuitionPoints } from "src/modules/distriuition-points/entities/distribuition-point.entity";

export class SearchDistributionPointResponseDto {
 
  id: string;
  name: string;
  phone: string;
  description: string;
  creator: UserResponseDTO;
  address: ResponseAddressDTO;

  constructor(distributionPoint: DistribuitionPoints){
    this.id = distributionPoint.id,
    this.name = distributionPoint.name,
    this.phone = distributionPoint.phone,
    this.description = distributionPoint.description,
    this.creator = new UserResponseDTO(distributionPoint.creator),
    this.address = new ResponseAddressDTO(distributionPoint.address)
    }
}