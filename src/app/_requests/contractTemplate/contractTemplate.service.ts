import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParamsService } from 'src/app/_services/http-params.service';
import { environment } from 'src/environments/environment';
import { PaginationModel } from '../../_modules/table-pagination/table-pagination.component';
import { ContractTemplate_getDTO, ContractTemplate_getListAllDTO, ContractTemplate_getListPaginationDTO } from './contractTemplateModel';

@Injectable({
    providedIn: 'root',
})
export class ContractTemplateHttpService {

    private readonly baseUrl: string = environment.apiUrl + `ContractTemplate/`

    constructor(private http: HttpClient) { }

    getListPagination(params: { PageNumber: number, PageSize: number }): Observable<PaginationModel<ContractTemplate_getListPaginationDTO[]>> {
        return this.http.get<PaginationModel<ContractTemplate_getListPaginationDTO[]>>(
            this.baseUrl + `getListPagination`,
            { params: HttpParamsService.ExtractionParams(params) }
        );
    }

    getListAll(params: { Name: string }): Observable<ContractTemplate_getListAllDTO[]> {
        return this.http.get<ContractTemplate_getListAllDTO[]>(this.baseUrl + `getListAll`, { params: HttpParamsService.ExtractionParams(params) });
    }

    get(params: { id: number }): Observable<ContractTemplate_getDTO> {
        return this.http.get<ContractTemplate_getDTO>(this.baseUrl, { params: HttpParamsService.ExtractionParams(params) });
    }

    post(body: { name: string, content: string }): Observable<any> {
        return this.http.post(this.baseUrl, body, { responseType: 'text' });
    }

    put(body: { id: number, name: string, content: string }): Observable<any> {
        return this.http.put(this.baseUrl, body, { responseType: 'text' });
    }

    delete(params: { id: number }): Observable<any> {
        return this.http.delete(this.baseUrl, { params: HttpParamsService.ExtractionParams(params), responseType: 'text' });
    }

}
