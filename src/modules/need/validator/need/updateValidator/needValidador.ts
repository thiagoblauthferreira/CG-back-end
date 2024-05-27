import { INeedValidate } from "./INeedValidator";

export function validatorNeedsUpdate<T>(need: T, ...objects: INeedValidate<T>[]){
    for(const object of objects){
       object.validate(need)
    }
}