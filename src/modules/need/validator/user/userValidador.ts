import { User } from "src/modules/auth/entities/auth.enity";
import { IUserValidate } from "./IUserValidator";

export function validatorUser(user: User, ...objects: IUserValidate[]){
    for(const object of objects){
       object.validate(user)
    }
}