import { User } from "src/modules/auth/entities/auth.enity";

export interface IUserValidate {
   validate(user: User): void;
}