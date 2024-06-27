import { NotAcceptableException } from "@nestjs/common";
//You must pass the deadline date and time to schedule the shipment
export function checkHours(collectionDate: Date, difference: number){
  
  const date = new Date();
  const option = { timeZone: 'America/Sao_Paulo' };
  const dateBrasilia = new Date(date.toLocaleString('pt-Br', option))
  const timeHours = Math.abs(dateBrasilia.getTime() - collectionDate.getTime())
  const diffHours = Math.ceil(timeHours / (1000 * 3600));

  if(diffHours < difference){
    throw new NotAcceptableException(`A data de agendamento não pode ser menor que ${difference}h.`)
  }
  
}