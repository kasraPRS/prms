import { Injectable } from '@angular/core';

interface AddressComponents {
  long_name: string;
  short_name: string;
  types: string[];
}
@Injectable({ providedIn: 'root' })
export class GooglePlacesService {
  static GetAddressInfo(address_components: any[]) {
    let address: string = '';
    let postcode: string = '';
    let locality: string = '';
    let country: string = '';
    let state: string = '';

    for (const component of address_components) {
      const componentType = component.types[0];
      switch (componentType) {
        case 'street_number':
          address = `${component.long_name} ${address}`;
          break;
        case 'route':
          address += component.short_name;
          break;

        case 'postal_code':
          postcode = `${component.long_name}${postcode}`;
          break;

        case 'postal_code_suffix':
          postcode = `${postcode}-${component.long_name}`;
          break;

        case 'locality':
          locality = component.long_name;
          break;
        case 'administrative_area_level_1':
          state = component.short_name;
          break;

        case 'country':
          country = component.long_name;
          break;
      }
    }

    return {
      address,
      postcode,
      locality,
      country,
      state,
    };
  }
}
