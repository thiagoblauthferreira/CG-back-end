import * as moment from 'moment-timezone';

import { NotAcceptableException } from "@nestjs/common";

export function checkHours(collectionDate: Date) {
 if (typeof collectionDate === 'string') {
    collectionDate = new Date(collectionDate);
  }
   
  const dataBrasilia = moment.tz('America/Sao_Paulo');
   
  const collectionDateMoment = moment.utc(collectionDate).utcOffset('-03:00').add(3, 'hours');

  const dataMinimaColeta = dataBrasilia.clone().add(1, 'hour');

    if (collectionDateMoment.isBefore(dataMinimaColeta)) {
    throw new NotAcceptableException('A data da coleta deve ter pelo menos uma hora após a data atual.');
  }
   
}
