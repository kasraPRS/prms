import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpParamsService } from '../../_services/http-params.service';
import { CityAndState_listOfCitiesDTO, CityAndState_listOfCountriesDTO, CityAndState_listOfStatesDTO } from './cityAndStateModel';



@Injectable({ providedIn: "root" })
export class CityAndStateHttpService {
    private readonly baseUrl: string = environment.apiUrl + 'CityAndState/';
    constructor(private http: HttpClient) { }

    listOfCities(params: { StateId: number }): Observable<CityAndState_listOfCitiesDTO[]> {
        return this.http.get<CityAndState_listOfCitiesDTO[]>(
            this.baseUrl + 'ListOfCities',
            { params: HttpParamsService.ExtractionParams(params) }
        );
    }
    listOfStates(params: { CountryId: any }): Observable<CityAndState_listOfStatesDTO[]> {
        return this.http.get<CityAndState_listOfStatesDTO[]>(
            this.baseUrl + 'ListOfStates',
            { params: HttpParamsService.ExtractionParams(params) }
        );
    }
    listOfCountries(): Observable<CityAndState_listOfCountriesDTO[]> {
        return this.http.get<CityAndState_listOfCountriesDTO[]>(
            this.baseUrl + 'ListOfCountries',
        );
    }
}
