import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DefaultCommission_getDTO } from './defaultCommissionModel';


@Injectable({
    providedIn: 'root'
})
export class DefaultCommissionHttpService {
    private readonly baseUrl: string = environment.apiUrl + 'DefaultCommission/';
    constructor(private http: HttpClient) { }

    get(): Observable<DefaultCommission_getDTO> {
        return this.http.get<DefaultCommission_getDTO>(this.baseUrl);
    }
    put(body: {
        rmCommission: number;
        dmCommission: number;
        level3Commission: number;
        level4Commission: number;
        level5Commission: number;
    }): Observable<any> {
        return this.http.put<any>(this.baseUrl, body);
    }

}
