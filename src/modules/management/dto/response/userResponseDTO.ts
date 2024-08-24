import { User } from "src/modules/auth/entities/auth.enity";

export class UserResponseDTO {

  private name: string;
  private contact: string;
  

  constructor(user: User){
    this.name = user.name,
    this.contact = user.phone
  }
}