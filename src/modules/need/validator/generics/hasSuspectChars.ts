import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IGenericValidate } from "./IGenericValidator";


@Injectable()
export class HasSuspectChars implements IGenericValidate<any>{
  
  validate(dto: any): void {
    const regex = /^[a-zA-Z0-9\s.,-]*$/;
    const values = Object.values(dto).map(String);
    
    for (const value of values) {
      if (!regex.test(value)) {
        throw new HttpException("Invalid characters", HttpStatus.BAD_REQUEST);
      }
    }
  }

}