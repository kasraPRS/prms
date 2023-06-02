import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParamsService } from 'src/app/_services/http-params.service';
import { environment } from 'src/environments/environment';
import { PaginationModel as Pagination } from '../../_modules/table-pagination/table-pagination.component';
import { Note_getDTO } from './noteModel';

@Injectable({
  providedIn: 'root',
})
export class NoteHttpService {
  private readonly baseUrl: string = environment.apiUrl + 'Note/'
  constructor(private http: HttpClient) { }

  post(note: FormData): Observable<any> {
    return this.http.post<any>(this.baseUrl, note);
  }
  get(params: { PageNumber: number, PageSize: number, UserId: number, fromUserId: string }): Observable<Pagination<Note_getDTO[]>> {
    return this.http.get<Pagination<Note_getDTO[]>>(this.baseUrl, { params: HttpParamsService.ExtractionParams(params) });
  }
  delete(params: { id: number }): Observable<any> {
    return this.http.delete(this.baseUrl, { params: HttpParamsService.ExtractionParams(params) });
  }

}
