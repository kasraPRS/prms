import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParamsService } from 'src/app/_services/http-params.service';
import { environment } from 'src/environments/environment';
import { PaginationModel } from '../../_modules/table-pagination/table-pagination.component';
import { Document_GetDocumentDTO } from './documentModel';

@Injectable({
    providedIn: 'root',
})
export class DocumentHttpService {
    private readonly baseUrl: string = environment.apiUrl + 'Document/'
    constructor(private http: HttpClient) { }

    post(body: FormData): Observable<any> {
        return this.http.post(this.baseUrl, body);
    }
    put(body: FormData): Observable<any> {
        return this.http.put(this.baseUrl, body);
    }
    delete(params: { id: number }): Observable<any> {
        return this.http.delete(this.baseUrl, { params: HttpParamsService.ExtractionParams(params) });
    }
    GetDocument(params: {
        userId?: string | null,
        fromUserId?: string | null,
        fileName?: string | null,
        pageNumber?: string | null,
        pageSize?: string | null
    }): Observable<PaginationModel<Document_GetDocumentDTO[]>> {
        return this.http.get<PaginationModel<Document_GetDocumentDTO[]>>(`${this.baseUrl}GetDocument`, { params: HttpParamsService.ExtractionParams(params) });
    }

}
