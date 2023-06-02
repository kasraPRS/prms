import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { HttpParamsService } from '../../_services/http-params.service';
import { Calender_GetEventsDTO } from './calendarModel';



@Injectable({ providedIn: "root" })
export class CalendarHttpService {
    private readonly baseUrl: string = environment.apiUrl + 'Calender/';
    constructor(private http: HttpClient) { }

    GetEvents(body: {
        periodType: number;
        userId: number;
        date: string;
    }): Observable<Calender_GetEventsDTO[]> {
        return this.http.post<Calender_GetEventsDTO[]>(this.baseUrl + 'GetEvents', body);
    }

}
