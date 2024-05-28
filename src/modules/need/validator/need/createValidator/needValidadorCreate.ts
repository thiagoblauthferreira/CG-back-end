import { INeedValidate } from "./INeedValidatorCreate";

export function validatorNeedsCreate<T>(need: T, ...objects: INeedValidate<T>[]){
    for(const object of objects){
       object.validate(need)
    }
}