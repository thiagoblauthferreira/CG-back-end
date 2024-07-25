import { User } from "src/modules/auth/entities/auth.enity";

export class UserResponseDTO {
   
  name: string;
  username: string;
  email: string;

  constructor(user: User){
    this.name = user.name,
    this.username = user.username,
    this.email = user.email
  }

}