import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationModel } from 'src/app/_modules/table-pagination/table-pagination.component';
import { HttpParamsService } from 'src/app/_services/http-params.service';
import { environment } from 'src/environments/environment';
import { Meeting_getDTO, Meeting_post_body, Meeting_put_body } from './meetingModel';
@Injectable({
  providedIn: 'root',
})
export class MeetingServiceService {
  private readonly baseUrl: string = environment.apiUrl + 'Meeting/';
  constructor(private http: HttpClient) { }

  get(params: { PageNumber: number, PageSize: number }): Observable<PaginationModel<Meeting_getDTO[]>> {
    return this.http.get<PaginationModel<Meeting_getDTO[]>>(this.baseUrl, { params: HttpParamsService.ExtractionParams(params) });
  }

  post(body: Meeting_post_body): Observable<any> {
    return this.http.post<any>(this.baseUrl, body);
  }

  put(body: Meeting_put_body): Observable<any> {
    return this.http.put<any>(this.baseUrl, body);
  }
  
}
