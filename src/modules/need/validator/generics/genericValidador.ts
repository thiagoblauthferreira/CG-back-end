import { IGenericValidate } from "./IGenericValidator";

export function validatorGeneric<T>(dto: T, ...objects: IGenericValidate<T>[]): void{
    for(const object of objects){
       object.validate(dto)
    }
}