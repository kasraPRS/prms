import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomCommission_GetCustomCommissionOfUserDTO } from './customCommissionModel';
import { HttpParamsService } from 'src/app/_services/http-params.service';


@Injectable({
    providedIn: 'root'
})
export class customCommissionHttpService {
    private readonly baseUrl: string = environment.apiUrl + 'CustomCommission/';
    constructor(private http: HttpClient) { }

    GetCustomCommissionOfUser(params: { userId: number }): Observable<CustomCommission_GetCustomCommissionOfUserDTO> {
        return this.http.get<CustomCommission_GetCustomCommissionOfUserDTO>(
            this.baseUrl + 'GetCustomCommissionOfUser',
            { params: HttpParamsService.ExtractionParams(params) }
        );
    }

    post(body: {
        rmId: number;
        rmCommission: number;
        dmCommission: number;
        level3Commission: number;
        level4Commission: number;
        level5Commission: number;
    }): Observable<any> {
        return this.http.post<any>(this.baseUrl, body);
    }

    put(body: {
        rmUserId: number;
        rmCommission: number;
        dmCommission: number;
        level3Commission: number;
        level4Commission: number;
        level5Commission: number;
    }): Observable<any> {
        return this.http.put<any>(this.baseUrl, body);
    }

    DeleteByAdmin(params: { userId: number }): Observable<any> {
        return this.http.delete<any>(this.baseUrl + 'DeleteByAdmin', { params: HttpParamsService.ExtractionParams(params) });
    }
}
