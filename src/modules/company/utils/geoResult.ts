
import { EnvConfig } from "src/config";
import { Address } from "src/modules/auth/entities/adress.enity";
import * as opencage from 'opencage-api-client';

export async function geoResult(address: Address): Promise<Address>{

    const addressString = `${address.logradouro}, ${address.numero}, ${address.bairro}, ${address.municipio}, ${address.estado}, ${address.pais}`;
    const geocodeResult = await opencage.geocode({ q: addressString, key: EnvConfig.OPENCAGE.API_KEY });
    
    if (geocodeResult.results.length > 0) {
      const { lat, lng } = geocodeResult.results[0].geometry;
      address.latitude = lat;
      address.longitude = lng;
     }

    return address;
}